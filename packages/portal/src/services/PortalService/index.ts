import { createServer, Socket } from "net";

import { IConfiguration } from "@tau/core";
import { Context, Service, ServiceSchema } from "moleculer";

import { Connection, IConnectionSettings, IPutsParams } from "./Connection";

interface IDisconnectParams {
  uuid: string;
}

interface IConnections {
  [key: string]: Connection;
}

interface IPortalServiceSchema extends ServiceSchema {
  connections?: IConnections;
}

export { IConnectionSettings, IPutsParams };

/**
 * The Portal service handles incoming connections and proxes the data to and from the plwyer
 * client to the game world. Only a single instance of this service should ever be run at a
 * time.
 */
export function PortalService(_config: IConfiguration): IPortalServiceSchema {
  return {
    name: "tau.portal",
    created() {
      this.connections = {};
      this.server = createServer();
    },
    started(): Promise<void> {
      return new Promise((resolve) => {
        this.server.on("listening", resolve);
        this.server.on("connection", (socket: Socket) => {
          const conn = new Connection(socket);
          const service = this.broker.createService(<Service>(<unknown>conn));
          this.connections[conn.settings.uuid] = service;
        });
        this.server.listen(4000, "127.0.0.1");
        this.broker.broadcast("tau.portal.started");
      });
    },
    handleConnectionDisconnected(ctx: Context<IDisconnectParams>) {
      this.logger.debug(
        "received disconnect notice, removing connection from registry"
      );
      delete this.connections[ctx.params.uuid];
    },
    /**
     * Returns the internal settings of all registered connections
     */
    getConnections() {
      return Object.values(this.connections).map(
        (conn: Connection) => conn.settings
      );
    },
  };
}
