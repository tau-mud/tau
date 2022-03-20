import { ReactElement } from "react";
import { render } from "ink";

import Moleculer, { ServiceBroker } from "moleculer";
import { Action, Event } from "typed-moleculer";

import { IMessageContext, IConnectionSettings, IPutsParams } from "@tau/portal";

import { IController } from "../../Controller";
import { TTemplateFunction } from "../../Template";
import { IRenderContext, Context } from ".";
import { RenderBuffer } from "./RenderBuffer";

export interface ISetInStoreParams {
  /**
   * The key to set in the store
   */
  key: string;
  /**
   * The value to set in the store
   */
  value: any;
}

export interface IGetFromStoreParams {
  /**
   * The key to get from the store
   */
  key: string;
  /**
   * The default value to return if the key is not found
   */
  defaultValue: any;
}

export interface ISetControllerParams {
  /**
   * The name of the controller to swithc to.
   */
  controller: string;
  /**
   * Whether or not to force the controller to start if it is already started
   */
  forceStart?: boolean;
}

export interface IRenderParams {
  /**
   * The name of the template to render.
   */
  template: string;
  /**
   * The context to render the template with.
   */
  context: IRenderContext;
}

/**
 * Thrown when an attempt is made to set a controller that has not been registered with the world.
 */
export class InvalidControllerError extends Error {
  constructor(controller: string) {
    super(`The controller '${controller}' is not a valid controller`);
  }
}

/**
 * A session instance represents an indvidual connection from the portal to the world.
 * `SessionInstanceServices` are created dynamically when a connection notifies the
 * {@link SessionService} that a new connection has beenc reated.
 *
 * ## Moleculer Service Name
 * `tau.world.sessions.<sessionUuid>`
 *
 * ## Moleculer Dependencies
 * {@link @tau/portal.services.Connection}
 */
export class Instance extends Moleculer.Service {
  readonly settings: IConnectionSettings;

  constructor(broker: ServiceBroker, params: IConnectionSettings) {
    super(broker);
    this.name = `tau.session.${params.uuid}`;
    this.settings = params;
    this.dependencies = [`tau.portal.connections.${params.uuid}`];
  }

  /**
   * @private
   */
  async started() {
    return this.actions.getController().then(async (controller: IController | null) => {
      if (controller) {
        return this.actions.resumeCurrentController();
      } else {
        return this.actions
          .setController({ controller: "start" })
          .then(() => this.actions.setInStore({ key: "flash", value: {} }));
      }
    });
  }

  /**
   * Sets a value in the connection store.
   *
   * @action `tau.world.sessions.<sessionUuid>.setInStore`
   */
  @Action()
  setInStore(ctx: Moleculer.Context<ISetInStoreParams>) {
    return ctx.call(serviceEndpoint(this.settings, "setInStore"), ctx.params);
  }

  /**
   * Gets a value from the connection store. May return a default if the value was
   * not found.
   *
   * @actions
   *
   * @param {String} key - the key to get the value for
   * @param {any} defaultValue - the default value to use if the key was not found
   */
  @Action()
  getFromStore(ctx: Moleculer.Context<IGetFromStoreParams>) {
    return ctx.call(serviceEndpoint(this.settings, "getFromStore"), ctx.params);
  }

  /**
   * Puts the provided message to the connection screen.
   *
   * @actions
   *
   * @param {String} message - the message to print to the connection screen
   */
  @Action()
  puts(ctx: Moleculer.Context<IPutsParams>) {
    ctx.call(serviceEndpoint(this.settings, "puts"), ctx.params);
  }

  /**
   * Print prints the cotnent to the connection. It does not add a newline on its own.
   */
  @Action()
  print(ctx: Moleculer.Context<IPutsParams>) {
    ctx.call(serviceEndpoint(this.settings, "print"), ctx.params);
  }
  /**
   * Returns the currently active controller. If no controller has been set for this
   * Session, then the `start` controller is returned.
   *
   * @actions
   */
  @Action()
  async getController() {
    this.logger.debug("getting controller");
    return this.actions
      .getFromStore({ key: "controller" })
      .then((name: string): Promise<IController> => {
        this.logger.debug(`the current controller is '${name}'`);
        return this.broker.call("tau.config.getValue", {
          key: `world.controllers.${name}`,
        });
      })
      .then((controller: IController | null) => {
        return controller;
      });
  }
  /**
   * Starts the currently set controller
   *
   * @actions
   */

  @Action()
  startCurrentController() {
    this.actions
      .getController()
      .then((controller: IController) => {
        this.logger.debug(`starting '${controller.name}'`);
        return controller.start(new Context(this));
      })
      .catch((err: Error) => {
        this.logger.error(err);
        this.actions.puts({
          message: "Uh oh. Something went terribly wrong!",
        });
      });
  }
  /**
   * Resumes the currently set controller.
   *
   * @actions
   */
  @Action()
  resumeCurrentController() {
    this.actions.getController().then((controller: IController) => {
      this.logger.debug(`resuming '${controller.name}'`);
      controller.resume(new Context(this));
    });
  }
  /**
   * Sets the controller. If the controller being set is the current controller, then the
   * controller's resume function is called, otherwise the controller's start function
   * is called
   *
   * @actions
   *
   * @param {String} controller - the name of the controller
   */
  @Action()
  async setController(ctx: Moleculer.Context<ISetControllerParams>) {
    this.logger.debug(`setting controller to '${ctx.params.controller}'`);
    return this.broker
      .call("tau.config.getValue", {
        key: `world.controllers.${ctx.params.controller}`,
      })
      .then(async (controller: IController) => {
        if (!controller) {
          throw new InvalidControllerError(ctx.params.controller);
        }
        return this.actions
          .setInStore({ key: "controller", value: controller.name })
          .then(() => this.resetFlash())
          .then(() => controller);
      })
      .then(() => this.actions.startCurrentController());
  }

  /**
   * Destroys the session.
   *
   * @actions
   */
  @Action()
  destroySession() {
    this.broker.broadcast(`tau.world.sessions.destroyed.${this.settings.uuid}`, {
      uuid: this.settings.uuid,
    });

    this.broker.destroyService(this);
  }
  /**
   * Handles incomming messages from the `Connection` and forwards it to the controller.
   *
   * @actions
   *
   * @param {String} message - the message from the connection.
   */
  @Action()
  async handleInput(ctx: Moleculer.Context<IMessageContext>) {
    this.logger.debug("handling input");
    return this.actions
      .getController()
      .then((controller: IController) => {
        this.logger.debug(
          `received input from connection, passing to '${controller.name}' controller`
        );
        return controller.handleInput(new Context(this), ctx.params);
      })
      .catch((error: Error) => {
        this.logger.error(error);
        this.actions.puts({ message: "Uh oh. Something went terribly wrong." });
      });
  }
  /**
   * Renders the react element to the player `Connection`.
   *
   * @actions
   *
   * @param {String} template - the name of the template to render
   */
  @Action()
  async renderTemplate(ctx: Moleculer.Context<IRenderParams>) {
    this.logger.debug(`rendering template '${ctx.params.template}'`);
    return ctx
      .call("tau.config.getValue", {
        key: `world.templates.${ctx.params.template}`,
      })
      .then((template: TTemplateFunction) => {
        if (template) {
          this.logger.debug(`building template '${ctx.params.template}'`);
          return template(ctx.params.context);
        } else {
          throw `the template '${ctx.params.template}' was not found`;
        }
      })
      .then((view: ReactElement) => {
        this.logger.debug(`rendering template '${ctx.params.template}' into buffer`);
        const buffer = new RenderBuffer();

        const { cleanup } = render(
          view,
          // @ts-ignore
          { stdout: buffer, patchConsole: false }
        );

        cleanup();

        return this.actions.print({ message: buffer.get() });
      });
  }

  @Event()
  "tau.portal.started"() {
    this.actions.destroySession();
  }

  getFromFlash(key: string, defaultValue: any) {
    return this.actions.getFromStore({
      key: `flash.${key}`,
      defaultValue: defaultValue,
    });
  }
  setInFlash(key: string, value: any) {
    return this.actions.setInStore({ key: `flash.${key}`, value });
  }
  resetFlash() {
    return this.actions.setInStore({ key: "flash", value: {} });
  }
}

function serviceEndpoint(params: IConnectionSettings, endpoint: string) {
  return `${servicePrefix(params)}.${endpoint}`;
}

function servicePrefix(params: IConnectionSettings) {
  return `tau.portal.connections.${params.uuid}`;
}
