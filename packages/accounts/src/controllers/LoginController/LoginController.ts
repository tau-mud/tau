import { IMessageContext } from "@tau/portal";
import { ISessionContext } from "@tau/world";

export const LoginController = {
  name: "login",
  resume: (_context: ISessionContext) => Promise.resolve(),
  start(context: ISessionContext) {
    return renderStep(context);
  },
  handleInput(context: ISessionContext, message: IMessageContext) {
    console.log(message);
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
    }
  });
}

function handleUsernameInput(
  context: ISessionContext,
  message: IMessageContext
) {
  console.log(message);
  switch (message.message) {
    case "create":
      return context.setController("register");
  }
}

function renderStep(context: ISessionContext): Promise<void> {
  return context.getFromFlash("step", 0).then((step: number) => {
    switch (step) {
      case 0:
        return context.render("login.emailOrCreate");
    }
  });
}
