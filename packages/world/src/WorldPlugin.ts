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
  public world: IWorldConfig = {
    controllers: {
      StartController,
    },
  };

  name = "world";
  services = [SessionService];
}
