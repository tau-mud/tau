import { Socket } from "net";

import { v4 as uuidv4 } from "uuid";
import { Context, GenericObject, ServiceSchema } from "moleculer";

export interface IConnectionSettings {
  uuid: string;
  remoteAddress: string;
}

export interface IPutsParams {
  message: string;
}

export interface IConnectionSchema extends ServiceSchema {
  store: GenericObject;
  settings: IConnectionSettings;
}

/**
 * Represents an individual connection to the Portal.
 */
export function Connection(socket: Socket): IConnectionSchema {
  const uuid = uuidv4();

  const schema = {
    name: `tau.portal.connections.${uuid}`,
    store: {},
    settings: {
      uuid,
      remoteAddress: socket.remoteAddress,
    },
    events: {},
    actions: {
      getStore() {
        return this.store;
      },
      setStore(ctx: Context<GenericObject>) {
        this.logger.debug("setting store to:", ctx.params);
        this.store = ctx.params;
      },
      puts(ctx: Context<IPutsParams>) {
        return socket.write(`${ctx.params.message}\r\n`);
      },
    },
    methods: {
      handleDisconnect() {
        this.logger.info("disconnected");
        this.broker.broadcast(
          `tau.portal.connections.disconnected.${this.settings.uuid}`,
          {
            uuid: this.settings.uuid,
          }
        );
        this.broker.destroyService(this);
      },
      notifySessionCreated() {
        this.broker.broadcast("tau.portal.connections.created", {
          uuid: this.settings.uuid,
          remoteAddress: this.settings.remoteAddress,
        });
      },
    },
    created() {
      socket.on("close", this.handleDisconnect);

      this.store = {};

      this.logger.info("creating session");
      this.notifySessionCreated();
    },
  };

  schema.events[`tau.world.sessions.store-updated.${uuid}`] =
    schema.actions.setStore;

  return schema;
}
