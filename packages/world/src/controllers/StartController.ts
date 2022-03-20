import { IMessageContext } from "@tau/portal";

import { Sessions } from "../services";

/**
 * The `StartController` is called as soon as a new session is started.
 */
export const StartController = {
  name: "start",
  resume(_context: Sessions.Context) {
    return Promise.resolve();
  },
  async start(context: Sessions.Context) {
    const version = require("../../../package.json").version;

    return context.puts(`TAU Mud Engine v${version}`).then(() => context.setController("motd"));
  },
  handleInput: (_context: Sessions.Context, _messageContext: IMessageContext) =>
    Promise.resolve({}),
};
