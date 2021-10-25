import { TService } from "./Service";
import { IConfiguration } from "./Configure";

export type TPlugin = (configuration: IConfiguration) => IPlugin;

export interface IServiceMap {
  [key: string]: TService;
}

export interface IPlugin {
  name: string;
  services?: IServiceMap;
  [key: string]: any;
}
