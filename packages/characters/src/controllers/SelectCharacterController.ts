import { IMessageContext } from "@tau/portal";
import { ISessionContext } from "@tau/world";

import { ICharacter } from "../services";

import { defaultsDeep } from "lodash";

export const SelectCharacterController = {
  name: "selectCharacter",
  resume: (_context: ISessionContext) => Promise.resolve(),
  start(context: ISessionContext) {
    return context
      .getFromStore("accountId")
      .then((accountId: number) =>
        context.call("tau.characters.find", { query: { accountId } })
      )
      .then((characters: ICharacter[]) => {
        if (characters.length === 0) {
          return context.setController("createCharacter");
        } else {
          return context
            .getFromStore("accountId")
            .then((accountId: number) =>
              context.call("tau.characters.find", { query: { accountId } })
            )
            .then((characters: Array<ICharacter>) => {
              return context.render(
                "selectCharacter.selectFromCharacters",
                characters
              );
            });
        }
      });
  },
  handleInput(context: ISessionContext, message: IMessageContext) {
    context
      .getFromStore("accountId")
      .then((accountId: number) =>
        context.call("tau.characters.find", { query: { accountId } })
      )
      .then((characters: Array<ICharacter>) => {
        if (message.message.match(/^[0-9]+$/)) {
          const selection = parseInt(message.message);
          if (selection < 1 || selection >= characters.length + 1) {
            return context
              .render("selectCharacter.selectionInvalid")
              .then(() =>
                context.render(
                  "selectCharacter.selectFromCharacters",
                  characters
                )
              );
          } else {
            const character = characters[selection - 1];
            return context.setInStore("characterId", character._id).then(() => {
              return context.call(
                "tau.entities.create",
                defaultsDeep(
                  {
                    container: [],
                    __sessionId: context.sessionId,
                    location: "limbo:zone/theVastness",
                  },
                  character
                )
              );
            });
          }
        } else {
          return context
            .render("selectCharacter.selectionInvalid")
            .then(() =>
              context.render("selectCharacter.selectFromCharacters", characters)
            );
        }
      })
      .catch((e) => context.logger.error(e));
  },
};
