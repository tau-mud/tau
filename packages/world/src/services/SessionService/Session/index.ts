import { Service, Action, Method, Event } from "moleculer-decorators";
import { Context, GenericObject } from "moleculer";
import { set, get } from "lodash";

import { TauService } from "@tau/core";
import { IConnectionSettings, IPutsParams } from "@tau/portal";

import { SessionContext } from "./SessionContext";

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

export { SessionContext };

/**
 * The Session represents an individual game session connected to the world. It is the
 * primary point in which all input and output to the player connection goes through.
 */
export class Session extends TauService {
  settings: IConnectionSettings;
  store: GenericObject;

  constructor(params: IConnectionSettings) {
    super();

    this.name = `tau.world.sessions.${params.uuid}`;
    this.settings = params;
    this.events[`tau.portal.connections.disconnected.${params.uuid}`] =
      this.destroySession;
  }

  /**
   * Gets the store from the connection. The connection itself stores a copy of the session
   * state, which is used when a session is created from after the world is restarted
   */
  @Method
  getStoreFromConnection() {
    return this.broker.call(
      `tau.portal.connections.${this.settings.uuid}.getStore`
    );
  }

  /**
   * Sets a value in the session store
   */
  @Action()
  setInStore(ctx: Context<ISetInStoreParams>) {
    this.store = set(this.store, ctx.params.key, ctx.params.value);
    // ensure we synchronize the new state across all services that care
    this.broker.broadcast(
      `tau.world.sessions.store-updated.${this.settings.uuid}`,
      this.store
    );

    return ctx.params.value;
  }

  /**
   * Returns the value of the given key from the store
   */
  @Action()
  getFromStore(ctx: Context<IGetFromStoreParams>) {
    return get(this.store, ctx.params.key);
  }

  /**
   * Outputs the provided message to the connection with newline
   */
  @Action()
  puts(ctx: Context<IPutsParams>) {
    ctx.call(serviceEndpoint(this.settings, "puts"), ctx.params);
  }

  /**
   * Sets the controller for the session
   */
  @Action()
  setController(ctx: Context<ISetControllerParams>) {
    this.actions
      .getFromStore({ key: "controller" })
      .then((controller: string): Promise<string> => {
        return this.actions.setInStore({ key: controller });
      })
      .then((controller: string) => {
        return controller;
      });
  }

  /**
   * Destroys the session
   */
  @Action()
  destroySession() {
    this.broker.broadcast(
      `tau.world.sessions.destroyed.${this.settings.uuid}`,
      {
        uuid: this.settings.uuid,
      }
    );

    this.broker.destroyService(this);
  }

  @Event()
  "tau.portal.started"() {
    this.actions.destroySession();
  }

  /**
   * @private
   */
  async started() {
    return this.actions.setController({ controller: "start" });
  }

  /**
   * @private
   */
  created() {
    this.store = {
      flash: {},
    };
  }
}

function serviceEndpoint(params, endpoint) {
  return `${servicePrefix(params)}.${endpoint}`;
}

function servicePrefix(params) {
  return `tau.portal.connections.${params.uuid}`;
}
