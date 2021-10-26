import { Service, GenericObject } from "moleculer";

export interface ISessionContext {
  puts: (message: string) => Promise<any>;
  render: (template: string, context?: GenericObject) => Promise<any>;
  setController: (controller: string) => Promise<any>;
  setInFlash: (key: string, value: any) => Promise<any>;
  getFromFlash: (key: string, defaultValue?: any) => Promise<any>;
  call: (endpoint: string, args: GenericObject) => Promise<any>;
}

export function SessionContext(session: Service): ISessionContext {
  return {
    puts(message: string): Promise<any> {
      return session.actions.puts({ message: message });
    },
    async render(template: string, context: GenericObject = {}): Promise<any> {
      session.actions.renderTemplate({ template, context });
    },
    setInFlash(key: string, value: string): Promise<any> {
      return session.setInFlash(key, value);
    },
    getFromFlash(key: string, defaultValue: any = null): Promise<any> {
      return session.getFromFlash(key, defaultValue);
    },
    setController(controller: string): Promise<any> {
      return session.actions.setController({ controller });
    },
    call(endpoint: string, args: GenericObject) {
      return session.broker.call(endpoint, args);
    },
  };
}
