import { Context } from "moleculer";
import { Action } from "typed-moleculer";
import { IEntity } from "world/lib";
import { Argv } from "yargs";

import { Context as SessionContext } from "../services/Sessions";
import { System as Base } from "../System";

export interface IHandleInputParams {
  context: SessionContext;
  input: string;
}

export class System extends Base {
  readonly name = "tau.commands";
  readonly attributes = ["commandSet"];

  @Action()
  async handleInput(ctx: Context<IHandleInputParams>) {
    return ctx.params.context
      .getFromStore("characterId")
      .then((_id: string) => ctx.call("tau.entities.fetch", { _id }))
      .then((entity: IEntity) => {
        return ctx.params.context.call("tau.commandSets.getCommandSet", {
          name: entity.commandSet,
        });
      })
      .then((commandSet: Argv) => {
        this.logger.debug(`input: ${ctx.params.input}`);
        return new Promise((resolve) => {
          commandSet.help().parse(ctx.params.input, ctx.params.context, (_err, _argv, output) => {
            if (output) {
              return resolve(ctx.params.context.puts(output));
            } else {
              resolve(Promise.resolve());
            }
          });
        });
      });
  }
}
