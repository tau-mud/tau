import { IMessageContext } from "@tau/portal";
import { ISessionContext } from "@tau/world";

export const RegistrationController = {
  name: "registration",
  resume: (_context: ISessionContext) => Promise.resolve(),
  start(context: ISessionContext) {
    return renderStep(context);
  },
  handleInput(context: ISessionContext, message: IMessageContext) {
    handleInput(context, message);
  },
};

async function renderStep(context: ISessionContext): Promise<void> {
  return context.getFromFlash("step", 0).then((step: number) => {
    switch (step) {
      case 0:
        return context.render("registration.promptUsername");
      case 1:
        return context.render("registration.confirmUsername");
    }
  });
}

async function handleInput(context: ISessionContext, message: IMessageContext) {
  return context.getFromFlash("step", 0).then(async (step: number) => {
    switch (step) {
      case 0:
        return context
          .setInFlash("username", message.message)
          .then(() => context.setInFlash("step", 1))
          .then(() => renderStep(context));
    }
  });
}
