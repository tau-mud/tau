import { IConfiguration } from "@tau/core";

import { EntityLoaderService } from "./EntityLoaderService";

export function EntityFileLoader(_config: IConfiguration) {
  return {
    name: "tau.loaders.file",
    mixins: { EntityLoaderService },
  };
}
