import { PortalPlugin } from "@tau/portal";
import { CorePlugin } from "@tau/core";
import { WorldPlugin } from "@tau/world";
import { AccountsPlugin } from "@tau/accounts";
import { CharactersPlugin } from "@tau/characters";

export default {
  plugins: [
    CorePlugin,
    PortalPlugin,
    WorldPlugin,
    AccountsPlugin,
    CharactersPlugin,
  ],
  redis: {
    host: "localhost",
    port: 6379,
  },
};
