import { IPlugin, IConfiguration } from "@tau/core";

import { StartController, MotdController } from "./controllers";
import { MotdTemplate } from "./templates";
import { SessionService, EntityService } from "./services";
import { IWorldOptions } from "./Configuration";

export interface IWorldPlugin extends IPlugin {
  world: IWorldOptions;
}

// Hackery to get around stupidness in Yoga
const proc: any = process;

const defaultFunction = proc._events.uncaughtException[0];
process.removeAllListeners("uncaughtException");
process.on("uncaughtException", defaultFunction);

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
