import {
  IPlugin,
  IConfiguration,
  IWorldOptions as ICoreWorldOptions,
} from "@tau/core";

import { TController } from "./Controller";
import {
  StartController,
  MotdController,
  LoginController,
} from "./controllers";
import { MotdTemplate, LoginTemplate } from "./templates";
import { SessionService } from "./services/SessionService";

interface IControllerMap {
  [key: string]: TController;
}

interface ITemplateMap {
  [key: string]: any;
}

export interface IWorldOptions extends ICoreWorldOptions {
  controllers: IControllerMap;
  templates: ITemplateMap;
}

interface IWorldPlugin extends IPlugin {
  world: IWorldOptions;
}

export function WorldPlugin(_config: IConfiguration): IWorldPlugin {
  return {
    name: "world",
    world: {
      services: [SessionService],
      controllers: {
        start: StartController,
        motd: MotdController,
        login: LoginController,
      },
      templates: {
        motd: MotdTemplate,
        login: LoginTemplate,
      },
    },
  };
}
