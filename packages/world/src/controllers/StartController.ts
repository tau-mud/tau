import { Controller } from "../Controller";
import { Sessions } from "../services";

/**
 * The `StartController` is called as soon as a new session is started. It simply displays the
 * Tau MUD Engine version information.
 */
export class StartController extends Controller {
  readonly name = "start";
  /**
   * @private
   */
  async start(context: Sessions.Context) {
    const version = require("../../../package.json").version;

    return context.puts(`TAU Mud Engine v${version}`).then(() => context.setController("motd"));
  }
}
