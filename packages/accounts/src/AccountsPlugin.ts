import { IPlugin, IConfiguration } from "@tau/core";

import { LoginController } from "./controllers";
import { LoginTemplate } from "./templates";

export function AccountsPlugin(_config: IConfiguration): IPlugin {
  return {
    name: "accounts",
    world: {
      controllers: {
        login: LoginController,
      },
      templates: {
        login: LoginTemplate,
      },
    },
  };
}
