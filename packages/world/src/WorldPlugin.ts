import { IPlugin, IConfiguration } from "@tau/core";

import { StartController, MotdController } from "./controllers";
import { MotdTemplate } from "./templates";
import { IWorldConfiguration } from "./Configuration";

// Services
import { Sessions, EntityService } from "./services";

// Systems
import { LocationSystem } from "./systems";
// import { RoomSystem } from "./services/RoomSystem";
import { GameController } from "./controllers/GameController";

/**
 * The World plugin is one of the two primary plugins that make up a Tau based game. It handles all interactions between
 * the player and the game world. This plugin should be loaded after `@tau/core` and before any other plugins
 * excepting `@tau/portal`.
 */
export function WorldPlugin(_config: IWorldConfiguration): IPlugin {
  return {
    name: "world",
    world: {
      services: {
        SessionService: Sessions.Manager,
        EntityService,
        // CommandSetService,
        // ContainerSystem,
        // LocationSystem,
        // CommandSystem,
        // BootstrapService,
        // RoomSystem,
      },
      controllers: {
        start: StartController,
        motd: MotdController,
        game: GameController,
      },
      templates: {
        motd: MotdTemplate,
      },
    },
  };
}
