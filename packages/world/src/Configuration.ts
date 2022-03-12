import { IServiceMap } from "@tau/core";

import { IController } from "./Controller";
import { ITemplate } from "./Template";

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
}
