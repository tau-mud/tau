import { IPlugin, IConfiguration } from "@tau/core";

import { StartController, MotdController } from "./controllers";
import { MotdTemplate } from "./templates";
import { SessionService, EntityService } from "./services";
import { IWorldOptions } from "./Configuration";

/**
 * The World plugin is one of the two primary plugins that make up a Tau based game. It handles all interactions between
 * the player and the game world. This plugin should be loaded after `@tau/core` and before any other plugins
 * excepting `@tau/portal`.
 */
export class WorldPlugin {
  /**
   * @private
   */
  public get name(): String {
    return "world";
  }

  /**
   * @private
   */
  public get world(): IWorldOptions {
    return {
      services: { SessionService, EntityService },
      controllers: {
        start: StartController,
        motd: MotdController,
      },
      templates: {
        motd: MotdTemplate,
      },
    };
  }
}
