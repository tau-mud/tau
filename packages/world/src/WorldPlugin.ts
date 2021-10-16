import { SessionService } from "./services/SessionService";
import { StartController } from "./controllers";

import { Plugin, IConfiguration } from "@tau/core";

interface IControllerMap {
  [key: string]: any;
}

interface IWorldConfig {
  controllers: IControllerMap;
}

export class WorldPlugin extends Plugin {
  world: IWorldConfig;
  constructor(config: IConfiguration) {
    super(config);
    this.name = "world";
    this.world = {
      controllers: {
        StartController,
      },
    };
    this.services = [SessionService];
  }
}
