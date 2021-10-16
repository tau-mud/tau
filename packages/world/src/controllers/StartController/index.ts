import { Controller } from "../../Controller";

export class StartController extends Controller {
  name = "start";

  start() {
    const version = require("../../../package.json").version;

    return this.session.puts(`TAU Mud Engine v${version}`);
  }
}
