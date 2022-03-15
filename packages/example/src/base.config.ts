import { PortalPlugin } from "@tau/portal";
import { CorePlugin } from "@tau/core";
import { WorldPlugin } from "@tau/world";
import { AccountsPlugin } from "@tau/accounts";
import { CharactersPlugin } from "@tau/characters";
import { IPlugin } from "@tau/core/lib/Plugin";
import { ZonesDataSourceService } from "./services/ZonesDataSourceService";
import path from "path";

function Game(_config: any): IPlugin {
  return {
    name: "Game",
    world: {
      services: [ZonesDataSourceService],
    },
  };
}

export default {
  plugins: [
    CorePlugin,
    PortalPlugin,
    WorldPlugin,
    AccountsPlugin,
    CharactersPlugin,
    Game,
  ],
  redis: {
    host: "localhost",
    port: 6379,
  },
  root: path.resolve(`${__dirname}/..`),
};
