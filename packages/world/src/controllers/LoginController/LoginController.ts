import { IController } from "../../Controller";
import { ISessionContext } from "../../services/SessionService";

export function LoginController(context: ISessionContext): IController {
  return {
    name: "registration",
    resume: () => Promise.resolve(),
    start() {
      return renderStep(context);
    },
  };
}

function renderStep(context: ISessionContext): Promise<void> {
  return context.getFromFlash("step", 0).then((step: number) => {
    switch (step) {
      case 0:
        return context.render("login.emailOrCreate");
    }
  });
}
