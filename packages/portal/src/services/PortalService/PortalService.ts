import { createServer, Socket } from "net";
import { Context, ServiceSchema } from "moleculer";

import { IConfiguration } from "@tau/core";

import { IConnectionSchema, Connection } from "./Connection";

interface IDisconnectParams {
  uuid: string;
}

interface IConnections {
  [key: string]: IConnectionSchema;
}

interface IPortalServiceSchema extends ServiceSchema {
  connections?: IConnections;
}

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

        // add connections to the internal connection registry
        this.server.on("connection", (socket: Socket) => {
          const conn = Connection(socket);
          const service = this.broker.createService(conn);
          this.connections[conn.settings.uuid] = service;
        });

        // start server
        this.server.listen(4000, "127.0.0.1");
        this.broker.broadcast("tau.portal.started");
      });
    },
    events: {
      "tau.portal.connections.diconnected"(ctx: Context<IDisconnectParams>) {
        this.logger.debug(
          "received disconnect notice, removing connection from registry"
        );
        delete this.connections[ctx.params.uuid];
      },
    },
    actions: {
      /**
       * Returns all of the connections currently connected to the portal.
       */
      getConnections() {
        return Object.values(this.connections).map(
          (conn: IConnectionSchema) => conn.settings
        );
      },
    },
  };
}
