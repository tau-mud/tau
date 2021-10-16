import { createServer, Server } from "net";

import { IConfiguration, TauService } from "@tau/core";
import { Service, Action } from "moleculer-decorators";
import { Context, Service as MoleculerService, ServiceSchema } from "moleculer";

import { Connection, IConnectionSettings, IPutsParams } from "./Connection";

interface IDisconnectParams {
  uuid: string;
}

export { IConnectionSettings, IPutsParams };

/**
 * The Portal service handles incoming connections and proxes the data to and from the plwyer
 * client to the game world. Only a single instance of this service should ever be run at a
 * time.
 */
@Service({
  name: "tau.portal",
})
export class PortalService extends TauService {
  readonly connections: Array<Connection> | {};
  readonly server: Server;

  constructor(_config: IConfiguration) {
    super();
    this.connections = {};
    this.server = createServer();
  }

  /**
   * @private
   */
  started(): Promise<void> {
    return new Promise((resolve) => {
      this.server.on("listening", resolve);
      this.server.on("connection", (socket) => {
        const conn = new Connection(socket);
        const service = this.broker.createService(
          <MoleculerService>(<unknown>conn)
        );

        this.connections[conn.settings.uuid] = service;
      });
      this.server.listen(4000, "127.0.0.1");
      this.broker.broadcast("tau.portal.started");
    });
  }

  handleConnectionDisconnected(ctx: Context<IDisconnectParams>) {
    this.logger.debug(
      "received disconnect notice, removing connection from registry"
    );
    delete this.connections[ctx.params.uuid];
  }

  /**
   * Returns the internal settings of all registered connections
   */
  @Action()
  getConnections() {
    return Object.values(this.connections).map((conn) => conn.settings);
  }
}
