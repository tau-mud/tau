import { IMessageContext } from "@tau/portal";

import { Sessions } from "../services";

export const MotdController = {
  name: "motd",
  resume: (_context: Sessions.Context) => Promise.resolve(),
  async start(context: Sessions.Context) {
    return context.render("motd.banner").then(() => context.setController("login"));
  },
  handleInput: (_context: Sessions.Context, _messageContext: IMessageContext) =>
    Promise.resolve({}),
};
