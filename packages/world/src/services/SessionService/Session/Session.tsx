import { ReactElement } from "react";

import { IMessageContext, IConnectionSettings, IPutsParams } from "@tau/portal";

import { Context, GenericObject, ServiceSchema } from "moleculer";
import { set, get } from "lodash";
import { render } from "ink";

import { SessionContext } from "./SessionContext";
import { RenderBuffer } from "./RenderBuffer";
import { IController, TController } from "../../../Controller";

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
}

export interface ISessionSchema extends ServiceSchema {
  settings: IConnectionSettings;
  store?: GenericObject;
  setInStore?: (args: ISetControllerParams) => Promise<any>;
  getFromStore?: (args: IGetFromStoreParams) => Promise<any>;
  puts?: (args: IPutsParams) => Promise<any>;
  setController?: (args: ISetControllerParams) => Promise<any>;
}

/**
 * The Session represents an individual game session connected to the world. It is the
 * primary point in which all input and output to the player connection goes through.
 */
export function Session(params: IConnectionSettings): ISessionSchema {
  const schema = {
    name: `tau.world.sessions.${params.uuid}`,
    settings: params,
    dependencies: [`tau.portal.connections.${params.uuid}`],
    started() {
      return this.getStoreFromConnection()
        .then((store: any) => {
          this.store = store;

          return Promise.resolve(store.controller || "start");
        })
        .then((controller: string) => {
          this.setController(controller);
        });
    },
    actions: {
      setInStore(ctx: Context<ISetInStoreParams>) {
        return this.setInStore(ctx.params.key, ctx.params.value);
      },
      getFromStore(ctx: Context<IGetFromStoreParams>) {
        return this.getFromStore(ctx.params.key, ctx.params.defaultValue);
      },
      puts(ctx: Context<IPutsParams>) {
        return this.puts(ctx.params.message);
      },
      setController(ctx: Context<ISetControllerParams>) {
        this.setController(ctx.params.controller);
      },
      destroySession() {
        this.broker.broadcast(
          `tau.world.sessions.destroyed.${this.settings.uuid}`,
          {
            uuid: this.settings.uuid,
          }
        );

        this.broker.destroyService(this);
      },
      handleMessage(ctx: Context<IMessageContext>) {},
    },
    events: {
      "tau.portal.started"() {
        this.actions.destroySession();
      },
    },
    methods: {
      puts(message: string) {
        this.broker.call(serviceEndpoint(this.settings, "puts"), { message });
      },
      render(element: ReactElement) {
        const buffer = RenderBuffer();

        render(
          element,
          // @ts-ignore
          { stdout: buffer }
        );

        return this.puts(buffer.get());
      },
      getController(): Promise<string> {
        this.logger.debug("getting controller");
        return this.getFromStore("controller");
      },
      setController(controllerToSet: string) {
        this.logger.debug(`setting controller to '${controllerToSet}'`);

        return this.broker
          .call("tau.config.getValue", {
            key: `world.controllers.${controllerToSet}`,
          })
          .then((controller: TController) => controller(SessionContext(this)))
          .then((controllerInstance: IController) => {
            return this.getFromStore("controller").then(
              (currentController: string) => {
                if (currentController === controllerToSet) {
                  this.logger.debug(`resuming '${controllerToSet}'`);
                  return controllerInstance.resume;
                } else {
                  this.logger.debug(`starting '${controllerToSet}'`);
                  return controllerInstance.start;
                }
              }
            );
          })
          .then((exec: () => Promise<any>) => exec())
          .then(() => {
            this.setInStore("controller", controllerToSet);
          });
      },
      getFromStore(key: string, def: any = null) {
        return Promise.resolve(get(this.store, key, def));
      },
      setInStore(key: string, value: any) {
        this.logger.debug(`setting '${key}' in store`);
        this.store = set(this.store, key, value);
        // ensure we synchronize the new state across all services that care
        this.broker.broadcast(
          `tau.world.sessions.store-updated.${this.settings.uuid}`,
          this.store
        );

        return Promise.resolve(value);
      },
      getFromFlash(key: string, defaultValue: any) {
        return this.getFromStore(`flash.${key}`, defaultValue);
      },
      setInFlash(key: string, value: any) {
        return this.setInFlash(`flash.${key}`, value);
      },
      getStoreFromConnection() {
        return this.broker.call(
          `tau.portal.connections.${this.settings.uuid}.getStore`
        );
      },
    },
    created() {
      this.store = {
        flash: {},
      };
    },
  };
  schema.events[`tau.portal.connections.disconnected.${params.uuid}`] =
    schema.actions.destroySession;

  schema.events[`tau.portal.connections.message.${params.uuid}`] =
    schema.actions.handleMessage;

  return schema;
}

function serviceEndpoint(params: IConnectionSettings, endpoint: string) {
  return `${servicePrefix(params)}.${endpoint}`;
}

function servicePrefix(params: IConnectionSettings) {
  return `tau.portal.connections.${params.uuid}`;
}
