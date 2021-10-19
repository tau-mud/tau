import { IConfiguration } from "@tau/core";
import { IConnectionSettings } from "@tau/portal";
import { Context, ServiceSchema } from "moleculer";

import { Session } from "./Session";
export { SessionContext, ISessionContext } from "./Session";

interface ISessionsSchema extends ServiceSchema {}

export function SessionService(_config: IConfiguration): ISessionsSchema {
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
      return this.broker
        .call("tau.portal.getConnections")
        .then((connections: Array<IConnectionSettings>) => {
          connections.forEach((conn) => {
            this.createSession(conn);
          });
        });
    },

    createSession(conn: IConnectionSettings) {
      this.logger.info(`creating session for ${conn.uuid}`);
      this.broker.createService(Session(conn));
    },
  };
}
