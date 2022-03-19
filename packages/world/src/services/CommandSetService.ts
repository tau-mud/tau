import { IWorldConfiguration } from "../Configuration";
import { ServiceSchema } from "moleculer";
import { keys, values } from "lodash";
import yargs, { CommandModule, Argv } from "yargs";

export interface ICommandSet {
  [key: string]: CommandModule;
}

export function CommandSetService(config: IWorldConfiguration): ServiceSchema {
  return {
    name: "tau.commandSets",
    created() {
      this.commandSets = {};
      keys(config.world.commandSets).forEach((key) => {
        let set = yargs.scriptName("").version(false);
        this.logger.info(`loading command set '${key}'`);

        keys(config.world.commandSets[key]).reduce((acc: Argv, command) => {
          this.logger.debug(`loading command '${command}'`);
          return acc.command(config.world.commandSets[key][command]);
        }, set);

        this.commandSets[key] = set;
      });
    },
    actions: {
      getCommandSet(ctx) {
        return this.commandSets[ctx.params.name];
      },
    },
  };
}
