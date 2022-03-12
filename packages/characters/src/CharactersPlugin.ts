import { IPlugin, IConfiguration } from "@tau/core";

import { CharactersService } from "./services";

export interface ICharactersPlugin extends IPlugin {}

export function CharactersPlugin(_config: IConfiguration): ICharactersPlugin {
  return {
    name: "characters",
    world: {
      services: { CharactersService },
    },
  };
}
