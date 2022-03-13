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

async function renderStep(context: ISessionContext): Promise<void> {
  return context.getFromFlash("step", 0).then(async (step: number) => {
    switch (step) {
      case 0:
        return context.render("createCharacter.promptCharacterName");
    }
  });
}

async function handleInput(context: ISessionContext, message: IMessageContext) {
  return context.getFromFlash("step", 0).then(async (step: number) => {
    switch (step) {
      case 0:
        return context
          .call("tau.characters.validateName", {
            name: message.message,
          })
          .then(async (validation) => {
            if (validation.valid) {
            } else {
              context.render(`createCharacter.${validation.message}`, {
                name: message.message,
              });
            }
          });
    }
  });
}
