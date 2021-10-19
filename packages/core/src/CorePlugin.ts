import { IPlugin } from "./Plugin";
import { IConfiguration } from "./Configure";
import { ConfigService } from "./services/ConfigService";

export function CorePlugin(_config: IConfiguration): IPlugin {
  return {
    name: "core",
    services: [ConfigService],
  };
}
