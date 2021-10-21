import { ReactElement } from "react";
import { Service } from "moleculer";

import { TTemplate } from "../../../templates";

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
    render(template: string): Promise<any> {
      return session.broker
        .call("tau.config.getValue", {
          key: `world.templates.${template}`,
        })
        .then((view: TTemplate) => view())
        .then((view: ReactElement) => session.render(view));
    },
    setInFlash(key: string, value: string): Promise<any> {
      return session.setInFlash(key, value);
    },
    getFromFlash(key: string, defaultValue: any): Promise<any> {
      return session.getFromFlash(key, defaultValue);
    },
    setController(controller: string): Promise<any> {
      return session.setController(controller);
    },
  };
}
