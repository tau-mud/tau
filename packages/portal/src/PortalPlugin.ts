import { Plugin, IConfiguration } from "@tau/core";

import { PortalService } from "./services/PortalService";

export class PortalPlugin extends Plugin {
  constructor(config: IConfiguration) {
    super(config);

    this.name = "core";
    this.services = [PortalService];
  }
}
