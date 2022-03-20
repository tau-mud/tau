import { GenericObject, LoggerInstance, Service } from "moleculer";

export interface IRenderContext {
  [key: string]: any;
}

export class Context {
  private readonly session: Service;
  readonly sessionID: string;
  readonly logger: LoggerInstance;

  constructor(session: Service) {
    this.session = session;
    this.sessionID = session.name;
    this.logger = session.logger;
  }

  puts(message: string): Promise<any> {
    return this.session.actions.puts({ message: message });
  }

  render(template: string, context: IRenderContext = {}): Promise<any> {
    return this.session.actions.renderTemplate({ template, context });
  }

  setInFlash(key: string, value: string): Promise<any> {
    return this.session.setInFlash(key, value);
  }

  getFromFlash(key: string, defaultValue: any = null): Promise<any> {
    return this.session.getFromFlash(key, defaultValue);
  }

  setInStore(key: string, value: string): Promise<any> {
    return this.session.actions.setInStore({ key, value });
  }

  getFromStore(key: string, defaultValue: any = null): Promise<any> {
    return this.session.actions.getFromStore({ key, defaultValue });
  }
  async setController(controller: string): Promise<any> {
    return this.session.actions.setController({ controller }).catch((e) => {
      this.logger.error(e);
      this.puts("Uh oh. Something went terribly wrong.");
    });
  }
  async call(endpoint: string, args: GenericObject) {
    return this.session.broker.call(endpoint, args).catch((err) => {
      this.logger.error(err);
      this.puts("Uh oh. Something went terribly wrong.");
      throw err;
    });
  }
}
