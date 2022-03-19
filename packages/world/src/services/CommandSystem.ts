import { ServiceSchema } from "moleculer";
import { SystemService } from "./SystemService";

import { hideBin } from "yargs/helpers";

export function CommandSystem(): ServiceSchema {
  return {
    name: "tau.commands",
    mixins: [SystemService],
    filter: { commandSet: { $exists: true } },
    actions: {
      handleInput(ctx) {
        console.log(this.entities);
        return ctx.params.context
          .getFromStore("characterId")
          .then((characterId) => this.actions.getEntity({ _id: characterId }))
          .then((entity) => {
            return ctx.params.context.call("tau.commandSets.getCommandSet", {
              name: entity.commandSet,
            });
          })
          .then((commandSet) => {
            this.logger.debug(`input: ${ctx.params.input}`);
            return new Promise((resolve) => {
              commandSet
                .help()
                .parse(
                  ctx.params.input,
                  ctx.params.context,
                  (err, argv, output) => {
                    if (output) {
                      return resolve(ctx.params.context.puts(output));
                    } else {
                      resolve(Promise.resolve());
                    }
                  }
                );
            });
          });
      },
    },
  };
}
