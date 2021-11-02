import { ServiceSchema } from "moleculer";
import { IPlugin } from "@tau/core";

export interface IPortalOptions {
  services: Array<ServiceSchema>;
}

export interface IPortalConfig extends IPlugin {
  portal: IPortalOptions;
}
