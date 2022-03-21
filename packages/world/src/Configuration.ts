import { IServiceMap } from "@tau/core";

import { Controller } from "./Controller";
import { ITemplate } from "./Template";
import { IConfiguration } from "@tau/core/lib/Configure";
import { Argv } from "yargs";

interface IControllerMap {
  [key: string]: Controller;
}

interface ITemplateMap {
  [key: string]: ITemplate;
}

export interface IWorldOptions {
  services: IServiceMap;
  commandSets: Array<Argv>;
  controllers?: IControllerMap;
  templates?: ITemplateMap;
  loadDataSources: Array<string>;
}

export interface IWorldConfiguration extends IConfiguration {
  world: IWorldOptions;
}
