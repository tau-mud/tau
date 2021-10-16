import { Context } from "moleculer";

import { TauService } from "../../TauService";
import { Service, Action } from "moleculer-decorators";
import { get } from "lodash";

import { IConfiguration } from "../../Configuration";

interface IGetValueParams {
  key: string;
}

/**
 * This service provides access to the game configuration data, and is run by all
 * game processes.
 */
@Service({
  name: "tau.core.config",
})
export class ConfigService extends TauService {
  settings: IConfiguration;

  constructor(config: IConfiguration) {
    super();
    this.settings = config;
  }

  @Action()
  set(ctx: Context<IConfiguration>) {
    this.settings = ctx.params;
  }

  @Action()
  getValue(ctx: Context<IGetValueParams>) {
    get(this.settings, ctx.params.key);
  }
}
