import { IPlugin, IConfiguration } from "@tau/core";

import { StartController, MotdController } from "./controllers";
import { MotdTemplate } from "./templates";
import { IWorldConfiguration } from "./Configuration";
import { ContainerSystem } from "./services/ContainerSystem";
import { SessionService } from "./services/SessionService";
import { EntityService } from "./services/EntityService";
import { LocationSystem } from "./services/LocationSystem";
import { BootstrapService } from "./services/BootstrapService";
import { RoomSystem } from "./services/RoomSystem";

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
        SessionService,
        EntityService,
        ContainerSystem,
        LocationSystem,
        BootstrapService,
        RoomSystem,
      },
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
