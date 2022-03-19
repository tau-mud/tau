import { Arguments, CommandModule } from "yargs";
import { ISessionContext } from "@tau/world";

export const look: CommandModule = {
  command: "look",
  aliases: ["l"],
  describe: "Look at your surroundings",
  handler: (context: Arguments<ISessionContext>) => {
    return context
      .getFromStore("characterId")
      .then((characterId) =>
        context.call("tau.entities.find", { query: { _id: characterId } })
      )
      .then(([character]) =>
        context.call("tau.entities.find", {
          query: { _id: character.location },
        })
      )
      .then(([location]) => context.puts(location.name));
  },
};
