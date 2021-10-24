import { IMessageContext } from "@tau/portal";

import { ISessionContext } from "./services/SessionService";

export interface IController {
  name: string;
  start(context: ISessionContext): Promise<any>;
  resume(context: ISessionContext): Promise<any>;
  handleInput(
    context: ISessionContext,
    messageContext: IMessageContext
  ): Promise<any>;
}
