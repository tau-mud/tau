import { IServiceMap } from "@tau/core";

import { IController } from "./Controller";
import { ITemplate } from "./Template";
import { IConfiguration } from "@tau/core/lib/Configure";

interface IControllerMap {
  [key: string]: IController;
}

interface ITemplateMap {
  [key: string]: ITemplate;
}

export interface IWorldOptions {
  services: IServiceMap;
  controllers?: IControllerMap;
  templates?: ITemplateMap;
  loadDataSources: Array<string>;
}

export interface IWorldConfiguration extends IConfiguration {
  world: IWorldOptions;
}
