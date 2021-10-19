import { IPlugin, IConfiguration } from "@tau/core";

import { PortalService } from "./services/PortalService";

export function PortalPlugin(_config: IConfiguration): IPlugin {
  return {
    name: "core",
    services: [],
    portal: {
      services: [PortalService],
    },
  };
}
