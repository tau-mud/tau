import { IPlugin } from "@tau/core";

import { StartController, MotdController } from "./controllers";
import { MotdTemplate } from "./templates";
import { IWorldConfiguration } from "./Configuration";

// Services
import { Entities, Bootstrapper } from "./Services";

// Systems
import { Locations } from "./Systems";
import { Commands } from "./Systems";

// Controllers
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
        // services
        // Sessions: Sessions.Manager,
        Entities: Entities.Registry,
        // Bootstrapper,

        // systems
        Locations: Locations.System,
        Commands: Commands.System,
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
