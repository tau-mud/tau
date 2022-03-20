import { IMessageContext } from "@tau/portal";

import { Sessions } from "./services";

export interface IController {
  name: string;
  start(context: Sessions.Context): Promise<any>;
  resume(context: Sessions.Context): Promise<any>;
  handleInput(context: Sessions.Context, messageContext: IMessageContext): Promise<any>;
}
