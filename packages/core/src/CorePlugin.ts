import { Plugin } from "./Plugin";
import { IConfiguration } from "./Configuration";
import { ConfigService } from "./services/ConfigService";

export class CorePlugin extends Plugin {
  name = "core";
  services = [ConfigService];
}
