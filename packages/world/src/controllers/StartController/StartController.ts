import { IController } from "../../Controller";
import { ISessionContext } from "../../services/SessionService";

export function StartController(context: ISessionContext): IController {
  return {
    name: "start",
    resume() {
      return Promise.resolve();
    },
    start() {
      const version = require("../../../package.json").version;

      return context
        .puts(`TAU Mud Engine v${version}`)
        .then(() => context.setController("motd"));
    },
    handleInput: () => Promise.resolve({}),
  };
}
