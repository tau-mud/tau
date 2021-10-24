import { TService } from "@tau/core";

import { IController } from "./Controller";
import { ITemplate } from "./Template";

interface IControllerMap {
  [key: string]: IController;
}

interface ITemplateMap {
  [key: string]: ITemplate;
}

export interface IWorldOptions {
  services: Array<TService>;
  controllers?: IControllerMap;
  templates?: ITemplateMap;
}
