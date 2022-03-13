import { IMessageContext } from "@tau/portal";
import { ISessionContext } from "@tau/world";

import { Document } from "mongoose";
import { compare } from "bcrypt";

export const LoginController = {
  name: "login",
  resume: (_context: ISessionContext) => Promise.resolve(),
  start(context: ISessionContext) {
    return renderStep(context);
  },
  handleInput(context: ISessionContext, message: IMessageContext) {
    return handleInputForStep(context, message);
  },
};

async function handleInputForStep(
  context: ISessionContext,
  message: IMessageContext
): Promise<any> {
  return context.getFromFlash("step", 0).then((step: number) => {
    switch (step) {
      case 0:
        return handleUsernameInput(context, message);
      case 1:
        return handlePasswordInput(context, message);
    }
  });
}

function handlePasswordInput(
  context: ISessionContext,
  message: IMessageContext
): Promise<any> {
  let account;
  return context
    .getFromFlash("username")
    .then((username: string) => {
      return context.call("tau.accounts.find", {
        query: {
          normalizedUsername: username.toLowerCase(),
        },
        limit: 1,
      });
    })
    .then((result: Array<Document>) => {
      if (result.length === 0) {
        return context
          .setInFlash("step", 0)
          .then(() => context.render("login.invalidCredentials"))
          .then(() => renderStep(context));
      } else {
        account = result[0];
        return compare(message.message, account.encryptedPassword).then(
          (valid) => {
            if (valid) {
              return context
                .setInStore("accountId", account.id)
                .then(() =>
                  context.call("tau.config.getValue", {
                    key: "afterLoginController",
                  })
                )
                .then((alc) => context.setController(alc));
            } else {
              return context
                .setInFlash("step", 0)
                .then(() => context.render("login.invalidCredentials"))
                .then(() => renderStep(context));
            }
          }
        );
      }
    });
}

function handleUsernameInput(
  context: ISessionContext,
  message: IMessageContext
) {
  switch (message.message) {
    case "create":
      return context.setController("registration");
    default:
      return context
        .setInFlash("username", message.message)
        .then(() => context.setInFlash("step", 1))
        .then(() => renderStep(context));
  }
}

function renderStep(context: ISessionContext): Promise<void> {
  return context.getFromFlash("step", 0).then((step: number) => {
    switch (step) {
      case 0:
        return context.render("login.usernameOrCreate");
      case 1:
        return context.render("login.password");
    }
  });
}
