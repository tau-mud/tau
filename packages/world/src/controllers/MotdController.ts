import { Controller } from "../Controller";
import { Sessions } from "../services";

/**
 * The `MotdController` displays the game `MOTD`.
 */
export class MotdController extends Controller {
  readonly name = "motd";

  /**
   * @private
   */
  async start(context: Sessions.Context) {
    return context.render("motd.banner").then(() => context.setController("login"));
  }
}
