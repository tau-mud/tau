import { IMessageContext } from "@tau/portal";

import { ISessionContext } from "../../services/SessionService";

/**
 * The `StartController` is called as soon as a new session is started.
 */
export const StartController = {
  name: "start",
  resume(_context: ISessionContext) {
    return Promise.resolve();
  },
  async start(context: ISessionContext) {
    const version = require("../../../package.json").version;

    return context
      .puts(`TAU Mud Engine v${version}`)
      .then(() => context.setController("motd"));
  },
  handleInput: (_context: ISessionContext, _messageContext: IMessageContext) =>
    Promise.resolve({}),
};
