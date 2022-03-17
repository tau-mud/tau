import { ServiceSchema } from "moleculer";
import { IConfiguration } from "./Configure";

export type TPlugin = (configuration: IConfiguration) => IPlugin;

export interface IServiceMap {
  [key: string]: (config: IConfiguration) => ServiceSchema;
}

export interface IPlugin {
  name: string;
  services?: IServiceMap;
  [key: string]: any;
}
