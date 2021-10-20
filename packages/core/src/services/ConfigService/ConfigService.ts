import { ServiceSchema, Context } from "moleculer";
import { get } from "lodash";

import { IConfiguration } from "../../Configure";

interface IGetValueParams {
  key: string;
  defaultValue: any;
}

interface IConfigServiceSchema extends ServiceSchema {
  settings: IConfiguration;
}

/**
 * This service provides access to the game configuration data, and is run by all
 * game processes.
 */
export function ConfigService(config: IConfiguration): IConfigServiceSchema {
  return {
    name: "tau.config",
    settings: config,
    started() {
      this.logger.debug("started with config", config);

      return Promise.resolve();
    },
    actions: {
      set(ctx: Context<IConfiguration>) {
        this.settings = ctx.params;
      },
      getValue(ctx: Context<IGetValueParams>) {
        this.logger.debug(`getting value for key '${ctx.params.key}'`);
        return get(this.settings, ctx.params.key) || ctx.params.defaultValue;
      },
    },
  };
}
