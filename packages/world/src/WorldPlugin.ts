import { IPlugin, IConfiguration } from "@tau/core";

import { StartController, MotdController } from "./controllers";
import { MotdTemplate } from "./templates";
import { SessionService } from "./services/SessionService";
import { IWorldOptions } from "./Configuration";

interface IWorldPlugin extends IPlugin {
  world: IWorldOptions;
}

export function WorldPlugin(_config: IConfiguration): IWorldPlugin {
  return {
    name: "world",
    world: {
      services: { SessionService },
      controllers: {
        start: StartController,
        motd: MotdController,
      },
      templates: {
        motd: MotdTemplate,
      },
    },
  };
}
