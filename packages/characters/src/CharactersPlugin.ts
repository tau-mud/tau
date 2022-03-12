import { IPlugin, IConfiguration } from "@tau/core";

import { CharactersService } from "./services";
import { CreateCharacterTemplate } from "./templates";
import { CreateCharacterController } from "./controllers";

export interface ICharactersPlugin extends IPlugin {}

export function CharactersPlugin(_config: IConfiguration): ICharactersPlugin {
  return {
    name: "characters",
    world: {
      services: { CharactersService },
      templates: {
        createCharacter: CreateCharacterTemplate,
      },
      controllers: {
        createCharacter: CreateCharacterController,
      },
    },
  };
}
