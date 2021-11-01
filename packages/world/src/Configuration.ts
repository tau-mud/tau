import { IServiceMap } from "@tau/core";

import { TGenericComponentSchema } from "./Component";
import { IController } from "./Controller";
import { ITemplate } from "./Template";

interface IControllerMap {
  [key: string]: IController;
}

interface ITemplateMap {
  [key: string]: ITemplate;
}

interface IComponentMap {
  [key: string]: TGenericComponentSchema;
}

export interface IWorldOptions {
  services: IServiceMap;
  controllers?: IControllerMap;
  templates?: ITemplateMap;
  components?: IComponentMap;
}
