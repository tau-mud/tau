import { SessionContext } from "./services/SessionService";

export abstract class Controller {
  abstract name: string;

  session: SessionContext;

  abstract start(): Promise<void>;

  constructor(session: SessionContext) {
    this.session = session;
  }
}
