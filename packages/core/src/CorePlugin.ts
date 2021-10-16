import { Plugin } from "./Plugin";
import { IConfiguration } from "./Configuration";
import { ConfigService } from "./services/ConfigService";

export class CorePlugin extends Plugin {
  constructor(config: IConfiguration) {
    super(config);

    this.name = "core";
    this.services = [ConfigService];
  }
}
