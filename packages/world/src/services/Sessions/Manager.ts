import Moleculer, { Context } from "moleculer";
import { Service, Action, Event } from "typed-moleculer";

import { IConnectionSettings } from "@tau/portal";

import { Instance } from "./Instance";
/**
 * Provides session management capabilties. This service is responsible for creating and destroying
 * game sessions.
 *
 * ## Moleculer Service Name
 * `tau.sessions`
 *
 * ## Moleculer Dependencies
 * * {@link @tau/portal.Portal.Service}
 **/
export class Manager extends Moleculer.Service {
  readonly dependencies = ["tau.portal.connections"];
  readonly name = "tau.sessions";

  /**
   * @private
   **/
  @Event()
  "tau.portal.connections.created"(ctx: Context<IConnectionSettings>) {
    this.createSession(ctx.params);
  }

  /**
   * @private
   **/
  async started() {
    this.broker.broadcast("tau.world.sessions.started");
    return this.broker
      .call("tau.portal.getConnections")
      .then((connections: Array<IConnectionSettings>) => {
        connections.forEach((conn) => {
          this.createSession(conn);
        });
      });
  }

  /**
   * @private
   **/
  createSession(conn: IConnectionSettings) {
    this.logger.info(`creating session for ${conn.uuid}`);
    const session = new Instance(this.broker, conn);

    return this.broker.createService(session);
  }
}
