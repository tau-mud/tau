import { IServiceMap } from "@tau/core";

import { IComponent } from "./Component";
import { IController } from "./Controller";
import { ITemplate } from "./Template";

interface IControllerMap {
  [key: string]: IController;
}

interface ITemplateMap {
  [key: string]: ITemplate;
}

interface IComponentMap {
  [key: string]: IComponent<any>;
}

export interface IWorldOptions {
  services: IServiceMap;
  controllers?: IControllerMap;
  templates?: ITemplateMap;
  components?: IComponentMap;
}
