import Moleculer, { Context } from "moleculer";
import { Action, Service } from "typed-moleculer";

import { get } from "lodash";

/**
 * Parameters for the `tau.config.getValue` action.
 */
export interface IGetValueParams {
  /**
   * The key of the value to get.
   */
  key: string;
  /**
   * The default value to return if the key is not found.
   */
  defaultValue: any;
}

/**
 * This service provides access to the game configuration data, and is run by all game processes.
 * Other services may access Tau specific configuration using this service.
 *
 * ### Moleculer Service Name
 *  `tau.config`
 *
 */
@Service({
  name: "tau.config",
})
export class Registry extends Moleculer.Service {
  /**
   * Get a value from the configuration using the provided key. Key can be a dot separated path.
   *
   * ### Moleculer Action
   * `tau.config.getValue`
   */
  @Action()
  async getValue(ctx: Context<IGetValueParams>) {
    return get(this.broker.runner.config.tau, ctx.params.key, ctx.params.defaultValue);
  }
}
