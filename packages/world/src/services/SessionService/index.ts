import { IConfiguration } from "@tau/core";
import { IConnectionSettings } from "@tau/portal";

import { Service, Context } from "moleculer";

import { Session } from "./Session";

export { SessionContext } from "./Session";

export function SessionService(_config: IConfiguration) {
  return {
    name: "tau.sessions",
    dependencies: ["tau.portal"],
    events: {
      "tau.portal.connections.created"(ctx: Context<IConnectionSettings>) {
        this.createSession(ctx.params);
      },
    },
    started() {
      this.broker.broadcast("tau.world.sessions.started");
      this.broker
        .call("tau.portal.getConnections")
        .then((connections: Array<IConnectionSettings>) => {
          connections.forEach((conn) => {
            this.createSession(conn);
          });
        });
    },

    createSession(conn: IConnectionSettings) {
      this.logger.info(`creating session for ${conn.uuid}`);
      this.broker.createService(new Session(conn));
    },
  };
}
