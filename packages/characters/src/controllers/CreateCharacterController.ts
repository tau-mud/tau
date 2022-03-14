import { ISessionContext } from "@tau/world";
import { IMessageContext } from "@tau/portal";

export const CreateCharacterController = {
  name: "createCharacter",
  resume: (_context: ISessionContext) => Promise.resolve(),
  start(context: ISessionContext) {
    return renderStep(context);
  },
  handleInput(context: ISessionContext, message: IMessageContext) {
    handleInput(context, message);
  },
};

function renderStep(context: ISessionContext): Promise<void> {
  return context.getFromFlash("step", 0).then(async (step: number) => {
    switch (step) {
      case 0:
        return context.render("createCharacter.promptCharacterName");
      case 1:
        return context
          .getFromFlash("name")
          .then((name) =>
            context.render("createCharacter.confirmName", { name })
          );
    }
  });
}

function handleInput(context: ISessionContext, message: IMessageContext) {
  return context.getFromFlash("step", 0).then(async (step: number) => {
    switch (step) {
      case 0:
        return context
          .call("tau.characters.validateName", {
            name: message.message,
          })
          .then(async (validation) => {
            if (validation.valid) {
              return context
                .setInFlash("step", 1)
                .then(() => context.setInFlash("name", message.message))
                .then(() => renderStep(context));
            } else {
              return context
                .render(`createCharacter.${validation.message}`, {
                  name: message.message,
                })
                .then(() => renderStep(context));
            }
          });
      case 1:
        const value = message.message.toLowerCase();

        switch (value) {
          case "n":
          case "no":
            return context
              .setInFlash("step", 0)
              .then(() => renderStep(context));
          case "y":
          case "yes":
            return context.getFromFlash("name").then((name) => {
              return context.getFromStore("accountId").then((accountId) => {
                context.call("tau.characters.create", { name, accountId });
              });
            });
        }
    }
  });
}
