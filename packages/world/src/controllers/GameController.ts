import { IMessageContext } from "@tau/portal";
import { Sessions } from "../services";

export const GameController = {
  name: "game",
  resume(_context: Sessions.Context) {
    return Promise.resolve();
  },
  async start(_context: Sessions.Context) {},
  handleInput: (context: Sessions.Context, input: IMessageContext) =>
    context.call("tau.commands.handleInput", { context, input: input.message }),
};
