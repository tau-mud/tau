import { Socket } from "net";

import { v4 as uuidv4 } from "uuid";
import { Service, Action } from "moleculer-decorators";
import { Context, GenericObject, Service as MoleculerService } from "moleculer";

import { TauService } from "@tau/core";

export interface IConnectionSettings {
  uuid: string;
  remoteAddress: string;
}

export interface IPutsParams {
  message: string;
}

/**
 * Represents an individual connection to the Portal.
 */
export class Connection extends TauService {
  readonly socket: Socket;
  readonly settings: IConnectionSettings;
  store: GenericObject;

  constructor(socket: Socket) {
    super();
    const uuid = uuidv4();

    this.name = `tau.portal.connections.${uuid}`;
    this.store = {};
    this.socket = socket;
    this.settings = {
      uuid,
      remoteAddress: socket.remoteAddress,
    };

    this.events[`tau.world.sessions.store-updated.${uuid}`] = this.setStore;
  }

  created() {
    this.socket.on("close", this.handleDisconnect);

    this.store = {};

    this.logger.info("creating session");
    this.notifySessionCreated();
  }

  @Action()
  getStore() {
    return this.store;
  }

  @Action()
  setStore(ctx: Context<GenericObject>) {
    this.store = ctx.params;
  }

  @Action()
  puts(ctx: Context<IPutsParams>) {
    return this.socket.write(`${ctx.params.message}\r\n`);
  }

  notifySessionCreated() {
    this.broker.broadcast("tau.portal.connections.created", {
      uuid: this.settings.uuid,
      remoteAddress: this.settings.remoteAddress,
    });
  }

  handleDisconnect() {
    this.logger.info("disconnected");
    this.broker.broadcast(
      `tau.portal.connections.disconnected.${this.settings.uuid}`,
      {
        uuid: this.settings.uuid,
      }
    );
    this.broker.destroyService(<MoleculerService>(<unknown>this));
  }
}
