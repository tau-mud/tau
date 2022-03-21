import { IMessageContext } from "@tau/portal";

import { Controller } from "../Controller";
import { Sessions } from "../services";

/**
 * This is the primary game controller. It take incoming input and passes it to the command
 * handler.
 */
export class GameController extends Controller {
  name: "game";

  /**
   * @private
   */
  handleInput(context: Sessions.Context, input: IMessageContext) {
    return context.call("tau.commands.handleInput", { context, input: input.message });
  }
}
