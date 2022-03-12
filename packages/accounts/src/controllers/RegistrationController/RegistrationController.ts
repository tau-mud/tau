import { IMessageContext } from "@tau/portal";
import { ISessionContext } from "@tau/world";
import { hash, compare } from "bcrypt";

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
  return context.getFromFlash("step", 0).then(async (step: number) => {
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
      case 3:
        return context.render("registration.promptConfirmPassword");
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
        return context
          .call("tau.accounts.validatePassword", {
            password: message.message,
          })
          .then(async (validation) => {
            if (validation.valid) {
              return hash(message.message, 10)
                .then((hashedPassword: string) =>
                  context.setInFlash("hashedPassword", hashedPassword)
                )
                .then(() => context.setInFlash("step", 3))
                .then(() => renderStep(context));
            } else {
              return context
                .render(`registration.${validation.message}`)
                .then(() => renderStep(context));
            }
          });
      case 3:
        return context
          .getFromFlash("hashedPassword")
          .then((hashedPassword: string) =>
            compare(message.message, hashedPassword)
          )
          .then(async (valid: boolean) => {
            if (valid) {
              context.logger.info("HERE");

              const afc = await context.call("tau.config.getValue", {
                key: "after_signin_controller",
              });

              return context.setController(afc);
            } else {
              return context
                .setInFlash("step", 2)
                .then(() =>
                  context.render("registration.passwordConfirmationFailed")
                )
                .then(() => renderStep(context));
            }
          });
    }
  });
}
