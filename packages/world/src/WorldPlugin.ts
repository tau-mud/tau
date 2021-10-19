import {
  IPlugin,
  IConfiguration,
  IWorldOptions as ICoreWorldOptions,
} from "@tau/core";

import { TController } from "./Controller";
import { StartController } from "./controllers";
import { SessionService } from "./services/SessionService";

interface IControllerMap {
  [key: string]: TController;
}

export interface IWorldOptions extends ICoreWorldOptions {
  controllers: IControllerMap;
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
      },
    },
  };
}
