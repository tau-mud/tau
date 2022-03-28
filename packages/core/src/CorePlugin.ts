import { IPlugin } from "./Plugin";
import { IConfiguration } from "./Configure";
import { Config } from "./services";

export function CorePlugin(_config: IConfiguration): IPlugin {
  return {
    name: "core",
    services: { Config: Config.Registry },
  };
}
