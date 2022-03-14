import { IMessageContext } from "@tau/portal";
import { ISessionContext } from "@tau/world";

import { ICharacter } from "../services";

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
        }
      });
  },
  handleInput(context: ISessionContext, message: IMessageContext) {
    handleInput(context, message);
  },
};

function handleInput(context, message) {}

function selectionInput(context: ISessionContext, message: IMessageContext) {}

function renderStep(context: ISessionContext): Promise<void> {
  return context.getFromFlash("step", 0).then((step: number) => {
    switch (step) {
      case 0:
        return context
          .getFromStore("accountId")
          .then((accountId: number) =>
            context.call("tau.characters.find", { query: { accountId } })
          )
          .then((characters: Array<ICharacter>) =>
            context.render("selectCharacter.selectFromCharacters", {
              characters,
            })
          );
    }
  });
}
