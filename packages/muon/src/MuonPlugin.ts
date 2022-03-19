import { IPlugin } from "@tau/core";

import { BasicCommandSet } from "./commands/BasicCommandSet";

export function MuonPlugin(): IPlugin {
  return {
    name: "muon",
    world: {
      commandSets: {
        BasicCommandSet,
      },
    },
  };
}
