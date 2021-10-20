import { Service } from "moleculer";

export interface ISessionContext {
  puts: (message: string) => Promise<any>;
}

export function SessionContext(session: Service): ISessionContext {
  return {
    puts(message: string): Promise<any> {
      return session.actions.puts({ message: message });
    },
  };
}
