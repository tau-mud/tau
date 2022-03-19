import { Arguments, CommandModule } from "yargs";
import { ISessionContext } from "@tau/world/lib/services/SessionService/Session/SessionContext";

export const north: CommandModule = {
  command: "north",
  describe: "Walk to the north",
  aliases: ["n"],
  handler(context: Arguments<ISessionContext>) {
    let entity;
    return context
      .getFromStore("characterId")
      .then((characterId) =>
        context.call("tau.entities.find", { query: { _id: characterId } })
      )
      .then(([character]) => {
        entity = character;
        return context.call("tau.entities.find", {
          query: { _id: character.location },
        });
      })
      .then(([location]) => {
        if (location.exits.north) {
          return context
            .call("tau.entities.find", {
              query: { _id: location.exits.north.to },
            })
            .then(([to]) => {
              return context.call("tau.locations.move", { to, entity });
            });
        } else {
          return context.puts("There is no path to the north.");
        }
      });
  },
};
