import React, { ReactElement } from "react";

import { IMessageContext, IConnectionSettings, IPutsParams } from "@tau/portal";

import { GenericObject, Context, ServiceSchema } from "moleculer";
import { render } from "ink";

import { SessionContext } from "./SessionContext";
import { RenderBuffer } from "./RenderBuffer";
import { IController } from "../../../Controller";
import { TTemplate } from "../../../Template";

interface ISetInStoreParams {
  key: string;
  value: any;
}

interface IGetFromStoreParams {
  key: string;
  defaultValue: any;
}

interface ISetControllerParams {
  controller: string;
  forceStart?: boolean;
}

interface IRenderParams {
  template: string;
  context: GenericObject;
}

export interface ISessionSchema extends ServiceSchema {
  settings: IConnectionSettings;
}

/**
 * The Session represents an individual game session connected to the world. It is the
 * primary point in which all input and output to the player connection goes through.
 */
export function Session(params: IConnectionSettings): ISessionSchema {
  const schema: ISessionSchema = {
    name: `tau.world.sessions.${params.uuid}`,
    settings: params,
    dependencies: [`tau.portal.connections.${params.uuid}`],
    started() {
      return this.actions
        .getController()
        .then((controller: IController | null) => {
          if (controller) {
            return this.actions.resumeCurrentController();
          } else {
            return this.actions
              .setController({ controller: "start" })
              .then(() => this.actions.setInStore({ key: "flash", value: {} }));
          }
        });
    },
    actions: {
      /**
       * Sets a value in the connection store.
       *
       * @actions
       *
       * @param {String} key - key to set
       * @param {any} value - value to be set
       */
      setInStore(ctx: Context<ISetInStoreParams>) {
        return ctx.call(
          serviceEndpoint(this.settings, "setInStore"),
          ctx.params
        );
      },
      /**
       * Gets a value from the connection store. May return a default if the value was
       * not found.
       *
       * @actions
       *
       * @param {String} key - the key to get the value for
       * @param {any} defaultValue - the default value to use if the key was not found
       */
      getFromStore(ctx: Context<IGetFromStoreParams>) {
        return ctx.call(
          serviceEndpoint(this.settings, "getFromStore"),
          ctx.params
        );
      },
      /**
       * Puts the provided message to the connection screen.
       *
       * @actions
       *
       * @param {String} message - the message to print to the connection screen
       */
      puts(ctx: Context<IPutsParams>) {
        ctx.call(serviceEndpoint(this.settings, "puts"), ctx.params);
      },
      /**
       * Returns the currently active controller. If no controller has been set for this
       * Session, then the `start` controller is returned.
       *
       * @actions
       */
      getController() {
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
      },
      /**
       * Starts the currently set controller
       *
       * @actions
       */
      startCurrentController() {
        this.actions.getController().then((controller: IController) => {
          this.logger.debug(`starting '${controller.name}'`);
          controller.start(SessionContext(this));
        });
      },
      /**
       * Resumes the currently set controller.
       *
       * @actions
       */
      resumeCurrentController() {
        this.actions.getController().then((controller: IController) => {
          this.logger.debug(`resuming '${controller.name}'`);
          controller.resume(SessionContext(this));
        });
      },
      /**
       * Sets the controller. If the controller being set is the current controller, then the
       * controller's resume function is called, otherwise the controller's start function
       * is called
       *
       * @actions
       *
       * @param {String} controller - the name of the controller
       */
      setController(ctx: Context<ISetControllerParams>) {
        this.logger.debug(`setting controller to '${ctx.params.controller}'`);
        return this.broker
          .call("tau.config.getValue", {
            key: `world.controllers.${ctx.params.controller}`,
          })
          .then((controller: IController) => {
            return this.actions
              .setInStore({ key: "controller", value: controller.name })
              .then(() => controller);
          })
          .then(() => this.actions.startCurrentController());
      },
      /**
       * Destroys the session.
       *
       * @actions
       */
      destroySession() {
        this.broker.broadcast(
          `tau.world.sessions.destroyed.${this.settings.uuid}`,
          {
            uuid: this.settings.uuid,
          }
        );

        this.broker.destroyService(this);
      },
      /**
       * Handles incomming messages from the `Connection` and forwards it to the controller.
       *
       * @actions
       *
       * @param {String} message - the message from the connection.
       */
      handleInput(ctx: Context<IMessageContext>) {
        this.logger.debug("handling input");
        return this.actions.getController().then((controller: IController) => {
          this.logger.debug(
            `received input from connection, passing to '${controller.name}' controller`
          );
          return controller.handleInput(SessionContext(this), ctx.params);
        });
      },
      /**
       * Renders the react element to the player `Connection`.
       *
       * @actions
       *
       * @param {String} template - the name of the template to render
       */
      async renderTemplate(ctx: Context<IRenderParams>) {
        this.logger.debug(`rendering template '${ctx.params.template}'`);
        return ctx
          .call("tau.config.getValue", {
            key: `world.templates.${ctx.params.template}`,
          })
          .then((template: TTemplate) => {
            if (template) {
              this.logger.debug(`building template '${ctx.params.template}'`);
              return template(ctx.params.context);
            } else {
              throw `the template '${ctx.params.template}' was not found`;
            }
          })
          .then((view: ReactElement) => {
            this.logger.debug(
              `rendering template '${ctx.params.template}' into buffer`
            );
            const buffer = RenderBuffer();

            render(
              view,
              // @ts-ignore
              { stdout: buffer }
            );

            return this.actions.puts({ message: buffer.get() });
          });
      },
    },
    events: {
      "tau.portal.started"() {
        this.actions.destroySession();
      },
    },
    methods: {
      getFromFlash(key: string, defaultValue: any) {
        return this.actions.getFromStore({
          key: `flash.${key}`,
          defaultValue: defaultValue,
        });
      },
      setInFlash(key: string, value: any) {
        return this.actions.setInStore({ key: `flash.${key}`, value });
      },
    },
  };

  schema.events[`tau.portal.connections.disconnected.${params.uuid}`] =
    schema.actions.destroySession;

  return schema;
}

function serviceEndpoint(params: IConnectionSettings, endpoint: string) {
  return `${servicePrefix(params)}.${endpoint}`;
}

function servicePrefix(params: IConnectionSettings) {
  return `tau.portal.connections.${params.uuid}`;
}
