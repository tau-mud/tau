import { TauService } from "@tau/core";
import { IConnectionSettings } from "@tau/portal";

import { Context } from "moleculer";
import { Service, Event } from "moleculer-decorators";

import { Session } from "./Session";

export { SessionContext } from "./Session";

@Service({
  name: "tau.world.sessions",
  depdencies: ["tau.portal"],
})
export class SessionService extends TauService {
  @Event()
  "tau.portal.connections.created"(ctx: Context<IConnectionSettings>) {
    this.createSession(ctx.params);
  }

  started() {
    this.broker.broadcast("tau.world.sessions.started");
    this.broker
      .call("tau.portal.getConnections")
      .then((connections: Array<IConnectionSettings>) => {
        connections.forEach((conn) => {
          this.createSession(conn);
        });
      });
  }

  createSession(conn: IConnectionSettings) {
    this.logger.info(`creating session for ${conn.uuid}`);
    this.broker.createService(new Session(conn));
  }
}
