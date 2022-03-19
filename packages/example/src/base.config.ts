import { PortalPlugin } from "@tau/portal";
import { CorePlugin } from "@tau/core";
import { WorldPlugin } from "@tau/world";
import { AccountsPlugin } from "@tau/accounts";
import { CharactersPlugin } from "@tau/characters";
import { MuonPlugin } from "@tau/muon";
import { IPlugin } from "@tau/core/lib/Plugin";
import { ZonesDataSource } from "./services/ZonesDataSource";
import path from "path";

function Game(_config: any): IPlugin {
  return {
    name: "Game",
    world: {
      services: [ZonesDataSource],
      loadDataSources: ["example.zones"],
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
    MuonPlugin,
    Game,
  ],
  redis: {
    host: "localhost",
    port: 6379,
  },
  root: path.resolve(`${__dirname}/..`),
};
