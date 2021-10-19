import { IController } from "../../Controller";
import { ISessionContext } from "../../services/SessionService";

export function StartController(_context: ISessionContext): IController {
  return {
    start(): Promise<any> {
      const version = require("../../../package.json").version;

      return this.session.puts(`TAU Mud Engine v${version}`);
    },
  };
}
