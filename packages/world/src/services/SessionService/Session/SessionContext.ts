import { Service, GenericObject, LoggerInstance } from "moleculer";

export interface ISessionContext {
  logger: LoggerInstance;
  puts: (message: string) => Promise<any>;
  render: (template: string, context?: GenericObject) => Promise<any>;
  setController: (controller: string) => Promise<any>;
  setInFlash: (key: string, value: any) => Promise<any>;
  getFromFlash: (key: string, defaultValue?: any) => Promise<any>;
  setInStore: (key: string, value: any) => Promise<any>;
  getFromStore: (key: string, defaultValue?: any) => Promise<any>;
  call: (endpoint: string, args: GenericObject) => Promise<any>;
}

export function SessionContext(session: Service): ISessionContext {
  return {
    logger: session.logger,
    puts(message: string): Promise<any> {
      return session.actions.puts({ message: message });
    },
    render(template: string, context: GenericObject = {}): Promise<any> {
      return session.actions.renderTemplate({ template, context });
    },
    setInFlash(key: string, value: string): Promise<any> {
      return session.setInFlash(key, value);
    },
    getFromFlash(key: string, defaultValue: any = null): Promise<any> {
      return session.getFromFlash(key, defaultValue);
    },
    setInStore(key: string, value: string): Promise<any> {
      return session.actions.setInStore({ key, value });
    },
    getFromStore(key: string, defaultValue: any = null): Promise<any> {
      return session.actions.getFromStore({ key, defaultValue });
    },
    setController(controller: string): Promise<any> {
      return session.actions.setController({ controller });
    },
    call(endpoint: string, args: GenericObject) {
      return session.broker.call(endpoint, args).catch((err) => {
        session.logger.error(err);
        this.puts("Uh oh. Something went terribly wrong.");
        throw err;
      });
    },
  };
}
