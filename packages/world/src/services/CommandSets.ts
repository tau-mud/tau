import Moleculer, { Context } from "moleculer";
import { Action } from "typed-moleculer";
import { keys } from "lodash";
import yargs, { CommandModule, Argv } from "yargs";

export interface ICommandSetMap {
  [key: string]: ICommandSet;
}

export interface ICommandSet {
  [key: string]: CommandModule;
}

export interface IGetCommandSetParams {
  name: string;
}

export class Registry extends Moleculer.Service {
  readonly name = "tau.commandSets";
  readonly dependencies = ["tau.config"];

  /**
   * @private
   */
  async started() {
    return this.broker
      .call("tau.config.getValue", { key: "world.commandSets" })
      .then((commandSets: ICommandSetMap) => {
        keys(commandSets).forEach((key) => {
          let set = yargs.scriptName("").version(false);
          this.logger.info(`loading command set '${key}'`);
          keys(commandSets[key]).reduce((acc: Argv, command) => {
            this.logger.debug(`loading command '${command}'`);
            return acc.command(commandSets[key][command]);
          }, set);
          this.commandSets[key] = set;
        });
      });
  }

  @Action()
  getCommandSet(ctx: Context<IGetCommandSetParams>) {
    return this.commandSets[ctx.params.name];
  }
}
