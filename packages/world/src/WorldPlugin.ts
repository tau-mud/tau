import { IPlugin, IConfiguration } from "@tau/core";

import { StartController, MotdController } from "./controllers";
import { MotdTemplate } from "./templates";
import { SessionService, EntityService } from "./services";
import { IWorldOptions } from "./Configuration";

export interface IWorldPlugin extends IPlugin {
  world: IWorldOptions;
}

/**
 * The World provides the actual game world content.
 */
export function WorldPlugin(_config: IConfiguration): IWorldPlugin {
  return {
    name: "world",
    world: {
      services: { SessionService, EntityService },
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
