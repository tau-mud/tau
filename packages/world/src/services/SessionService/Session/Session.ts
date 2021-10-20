import { Context, GenericObject, ServiceSchema } from "moleculer";
import { set, get } from "lodash";
import { render } from "ink";
import { WriteStream } from "fs";

import { SessionContext } from "./SessionContext";
import { RenderBuffer } from "./RenderBuffer";

import { IController, TController } from "../../../Controller";

import { IConnectionSettings, IPutsParams } from "@tau/portal";

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
        return ctx.call(serviceEndpoint(this.settings, "puts"), ctx.params);
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
    },
    events: {
      "tau.portal.started"() {
        this.actions.destroySession();
      },
    },
    methods: {
      render(template, view) {
        return this.broker
          .call("tau.config.get", { template: template })
          .then((template: JSX.Element) => {
            renderToString(template[view](this.store));
          });
      },
      setController(controllerToSet: string) {
        this.logger.debug(`setting controller to '${controllerToSet}'`);
        let oldController: string;

        return this.getFromStore("controller")
          .then((controller: string): Promise<string> => {
            oldController = controller;

            return Promise.resolve(controller || "start");
          })
          .then((controller: string) => {
            return this.broker.call("tau.config.getValue", {
              key: `world.controllers.${controller}`,
            });
          })
          .then((controller: TController) => {
            return controller(SessionContext(this));
          })
          .then((controller: IController) => {
            if (controller.name == oldController) {
              this.logger.debug(
                `controller '${controller.name}' is the same as '${oldController}', calling resume`
              );
              return controller.resume();
            } else {
              this.logger.debug(
                `controller '${controller.name}' is different than '${oldController}', calling start`
              );
              return controller.start();
            }
          })
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

  return schema;
}

function serviceEndpoint(params: IConnectionSettings, endpoint: string) {
  return `${servicePrefix(params)}.${endpoint}`;
}

function servicePrefix(params: IConnectionSettings) {
  return `tau.portal.connections.${params.uuid}`;
}

function renderToString(template: JSX.Element) {
  return render(
    template,
    // @ts-ignore
    RenderBuffer()
  );
}
