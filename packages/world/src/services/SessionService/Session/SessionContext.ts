import { Session } from "./index";

export class SessionContext {
  session: Session;

  constructor(session: Session) {
    this.session = session;
  }

  puts(message: string): Promise<any> {
    return this.session.broker.call(
      `tau.portal.connections.${this.session.settings.uuid}.puts`,
      { message }
    );
  }
}
