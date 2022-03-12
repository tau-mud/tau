import { IEntity } from "@tau/world";
import { kebabCase, lowerCase } from "lodash";

interface ICharacter extends IEntity {
  name: string;
}

export function CharacterFactory(name): ICharacter {
  return {
    id: lowerCase(kebabCase(name)),
    name,
  };
}
