import { Context } from "moleculer";

import { get } from "lodash";

import { ITauBrokerOptions } from "../Configure";

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
 * @serviceName `tau.config`
 */
export const ConfigService = {
  name: "tau.config",
  settings: {},
  started() {
    return Promise.resolve();
  },
  actions: {
    /**
     * Get a value from the configuration.
     *
     * @action `tau.config.getValue`
     */
    async getValue(ctx: Context<IGetValueParams>) {
      return ctx
        .call("$node.options")
        .then((options: ITauBrokerOptions) =>
          get(options.tau, ctx.params.key, ctx.params.defaultValue)
        );
    },
  },
};
