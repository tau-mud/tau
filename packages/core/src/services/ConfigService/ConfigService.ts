import { ServiceSchema, Context } from "moleculer";
import { get } from "lodash";

import { IConfiguration } from "../../Configure";

interface IGetValueParams {
  key: string;
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
    actions: {
      set(ctx: Context<IConfiguration>) {
        this.settings = ctx.params;
      },
      getValue(ctx: Context<IGetValueParams>) {
        get(this.settings, ctx.params.key);
      },
    },
  };
}
