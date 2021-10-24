import { TService } from "./Service";
import { IConfiguration } from "./Configure";

export type TPlugin = (configuration: IConfiguration) => IPlugin;

export interface IPlugin {
  name: string;
  services?: Array<TService>;
  [key: string]: any;
}
