import { Service } from "moleculer";

export interface ISessionContext {
  puts: (message: string) => Promise<any>;
  render: (template: string) => Promise<any>;
  setController: (controller: string) => Promise<any>;
  setInFlash: (key: string, value: any) => Promise<any>;
  getFromFlash: (key: string, defaultValue: any) => Promise<any>;
}

export function SessionContext(session: Service): ISessionContext {
  return {
    puts(message: string): Promise<any> {
      return session.actions.puts({ message: message });
    },
    async render(template: string): Promise<any> {
      session.actions.renderTemplate({ template });
    },
    setInFlash(key: string, value: string): Promise<any> {
      return session.setInFlash(key, value);
    },
    getFromFlash(key: string, defaultValue: any): Promise<any> {
      return session.getFromFlash(key, defaultValue);
    },
    setController(controller: string): Promise<any> {
      return session.actions.setController({ controller });
    },
  };
}
