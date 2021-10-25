import { IPlugin, IConfiguration } from "@tau/core";

import { AccountsService } from "./services";
import { LoginController, RegistrationController } from "./controllers";
import { LoginTemplate, RegistrationTemplate } from "./templates";

export function AccountsPlugin(_config: IConfiguration): IPlugin {
  return {
    name: "accounts",
    world: {
      services: { AccountsService },
      controllers: {
        login: LoginController,
        registration: RegistrationController,
      },
      templates: {
        login: LoginTemplate,
        registration: RegistrationTemplate,
      },
    },
  };
}
