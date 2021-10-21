import { IController } from "../../Controller";
import { ISessionContext } from "../../services/SessionService";

export function MotdController(context: ISessionContext): IController {
  return {
    name: "motd",
    resume: () => Promise.resolve(),
    start() {
      return context
        .render("motd.banner")
        .then(() => context.setController("registration"));
    },
  };
}
