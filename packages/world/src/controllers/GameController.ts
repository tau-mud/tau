import { ISessionContext } from "@tau/world";
import { IMessageContext } from "@tau/portal";

export const GameController = {
  name: "game",
  resume(_context: ISessionContext) {
    return Promise.resolve();
  },
  async start(_context: ISessionContext) {},
  handleInput: (context: ISessionContext, input: IMessageContext) =>
    context.call("tau.commands.handleInput", { context, input: input.message }),
};
