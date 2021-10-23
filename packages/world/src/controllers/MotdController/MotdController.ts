import { IMessageContext } from "@tau/portal";

import { ISessionContext } from "../../services/SessionService";

export const MotdController = {
  name: "motd",
  resume: (_context: ISessionContext) => Promise.resolve(),
  async start(context: ISessionContext) {
    return context
      .render("motd.banner")
      .then(() => context.setController("login"));
  },
  handleInput: (_context: ISessionContext, _messageContext: IMessageContext) =>
    Promise.resolve({}),
};
