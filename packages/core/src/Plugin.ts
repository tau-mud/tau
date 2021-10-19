import { GenericObject } from "moleculer";

import { TService } from "./Service";
import { IConfiguration } from "./Configure";

export type TPlugin = (configuration: IConfiguration) => IPlugin;

export interface IWorldOptions {
  services?: Array<TService>;
  controllers?: GenericObject;
}

export interface IPlugin {
  name: string;
  services?: Array<TService>;
  portal?: {
    services?: Array<TService>;
  };
  world?: IWorldOptions;
}
