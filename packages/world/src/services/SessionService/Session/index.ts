import { Context, GenericObject, ServiceSchema } from "moleculer";
import { set, get } from "lodash";

import { IConnectionSettings, IPutsParams } from "@tau/portal";

import { ISessionContext, SessionContext } from "./SessionContext";

interface ISetInStoreParams {
  key: string;
  value: any;
}

interface IGetFromStoreParams {
  key: string;
}

interface ISetControllerParams {
  controller: string;
}

export interface ISessionSchema extends ServiceSchema {
  settings: IConnectionSettings;
  store?: GenericObject;
}

export { ISessionContext, SessionContext };

/**
 * The Session represents an individual game session connected to the world. It is the
 * primary point in which all input and output to the player connection goes through.
 */
export function Session(params: IConnectionSettings): ISessionSchema {
  const schema = {
    name: `tau.world.sessions.${params.uuid}`,
    settings: params,
    actions: {
      setInStore(ctx: Context<ISetInStoreParams>) {
        this.store = set(this.store, ctx.params.key, ctx.params.value);
        // ensure we synchronize the new state across all services that care
        this.broker.broadcast(
          `tau.world.sessions.store-updated.${this.settings.uuid}`,
          this.store
        );

        return ctx.params.value;
      },
      getFromStore(ctx: Context<IGetFromStoreParams>) {
        return get(this.store, ctx.params.key);
      },
      puts(ctx: Context<IPutsParams>) {
        ctx.call(serviceEndpoint(this.settings, "puts"), ctx.params);
      },
      setController(ctx: Context<ISetControllerParams>) {
        this.actions
          .getFromStore({ key: "controller" })
          .then((controller: string): Promise<string> => {
            return this.actions.setInStore({ key: controller });
          })
          .then((controller: string) => {
            return controller;
          });
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
      getStoreFromConnection() {
        return this.broker.call(
          `tau.portal.connections.${this.settings.uuid}.getStore`
        );
      },
    },
    started() {
      return this.actions.setController({ controller: "start" });
    },
    created() {
      this.store = {
        flash: {},
      };
    },
  };
  schema.events[`tau.portal.connections.disconnected.${params.uuid}`] =
    this.destroySession;

  return schema;
}

function serviceEndpoint(params: IConnectionSettings, endpoint: string) {
  return `${servicePrefix(params)}.${endpoint}`;
}

function servicePrefix(params: IConnectionSettings) {
  return `tau.portal.connections.${params.uuid}`;
}
