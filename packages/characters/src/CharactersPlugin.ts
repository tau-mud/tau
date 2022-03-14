import { IPlugin, IConfiguration } from "@tau/core";

import { CharactersService } from "./services";
import { CreateCharacterTemplate, SelectCharacterTemplate } from "./templates";
import {
  SelectCharacterController,
  CreateCharacterController,
} from "./controllers";

export interface ICharactersPlugin extends IPlugin {}

export function CharactersPlugin(_config: IConfiguration): ICharactersPlugin {
  return {
    name: "characters",
    world: {
      services: { CharactersService },
      templates: {
        createCharacter: CreateCharacterTemplate,
        selectCharacter: SelectCharacterTemplate,
      },
      controllers: {
        createCharacter: CreateCharacterController,
        selectCharacter: SelectCharacterController,
      },
    },
  };
}
