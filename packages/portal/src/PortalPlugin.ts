import { Plugin, IConfiguration } from "@tau/core";

import { PortalService } from "./services/PortalService";

export class PortalPlugin extends Plugin {
  name = "core";
  services = [PortalService];
}
