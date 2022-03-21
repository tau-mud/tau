import { IMessageContext } from "@tau/portal";

import { Sessions } from "./services";

/**
 * A controller processes interactions from the player connection. Controllers are designed to
 * allow different modes of interaction. For example, the {@link LoginController} handles the
 * login process.
 */
export class Controller {
  /**
   * Returns the name of the controller.
   */
  public name: string;

  /**
   * called when the controller is started.
   */
  start(_context: Sessions.Context): Promise<any> {
    return Promise.resolve();
  }

  /**
   * Called when the controller is resumed.
   */
  resume(_context: Sessions.Context): Promise<any> {
    return Promise.resolve();
  }

  /**
   * Handles input from the player connection.
   */
  handleInput(_context: Sessions.Context, _messageContext: IMessageContext): Promise<any> {
    return Promise.resolve();
  }
}
