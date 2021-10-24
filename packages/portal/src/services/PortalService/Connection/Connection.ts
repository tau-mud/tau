import { Socket } from "net";
import { set, get } from "lodash";

import { v4 as uuidv4 } from "uuid";
import { Context, GenericObject, ServiceSchema } from "moleculer";
import { MessageContext, IMessageContext } from "./MessageContext";

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
      getFromStore(ctx: Context<GenericObject>) {
        return Promise.resolve(
          get(this.store, ctx.params.key, ctx.params.defaultValue)
        );
      },
      setInStore(ctx: Context<GenericObject>) {
        this.logger.debug(`setting '${ctx.params.key}' in store`);
        this.store = set(this.store, ctx.params.key, ctx.params.value);

        return ctx.params.value;
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
      handleInput(data: Buffer | String) {
        const message = MessageContext(
          data.toString().replace(/(\r\n|\n|\r)/gm, "")
        );

        this.broker.call(
          `tau.world.sessions.${this.settings.uuid}.handleInput`,
          {
            message,
          }
        );
      },
    },
    created() {
      socket.on("close", this.handleDisconnect);
      socket.on("data", this.handleInput);

      this.store = {};

      this.logger.info("creating session");
      this.notifySessionCreated();
    },
  };

  return schema;
}
