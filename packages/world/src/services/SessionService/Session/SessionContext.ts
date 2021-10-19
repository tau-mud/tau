import { ISessionSchema } from "./index";

export interface ISessionContext {
  puts: (message: string) => Promise<any>;
}

export function SessionContext(session: ISessionSchema): ISessionContext {
  return {
    puts(message: string): Promise<any> {
      return session.broker.call(
        `tau.portal.connections.${session.settings.uuid}.puts`,
        { message }
      );
    },
  };
}
