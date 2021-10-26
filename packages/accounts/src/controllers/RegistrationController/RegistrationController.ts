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
        return context
          .getFromFlash("username")
          .then((username: string) =>
            context.render("registration.confirmUsername", { username })
          );
      case 2:
        return context.render("registration.promptPassword");
    }
  });
}

async function handleInput(context: ISessionContext, message: IMessageContext) {
  return context.getFromFlash("step", 0).then(async (step: number) => {
    switch (step) {
      case 0:
        return context
          .call("tau.accounts.validateUsername", {
            username: message.message,
          })
          .then(async (validation) => {
            if (validation.valid) {
              return context
                .setInFlash("username", message.message)
                .then(() => context.setInFlash("step", 1))
                .then(() => renderStep(context));
            } else {
              context.render(`registration.${validation.message}`, {
                username: message.message,
              });
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
            return context
              .setInFlash("step", 2)
              .then(() => renderStep(context));
        }
      case 2:
        return context.call("tau.accounts.validatePassword", {
          password: message.message,
        });
    }
  });
}
