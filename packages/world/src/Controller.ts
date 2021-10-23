import { IMessageContext } from "@tau/core";

import { ISessionContext } from "./services/SessionService";

export interface IController {
  name: string;
  start(context: ISessionContext): Promise<any>;
  resume(context: ISessionContext): Promise<any>;
  handleInput(
    messageContext: IMessageContext,
    context: ISessionContext
  ): Promise<any>;
}
