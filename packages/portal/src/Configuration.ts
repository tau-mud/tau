import { TService, IPlugin } from "@tau/core";

export interface IPortalOptions {
  services: Array<TService>;
}

export interface IPortalConfig extends IPlugin {
  portal: IPortalOptions;
}
