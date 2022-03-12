import { defaultsDeep } from "lodash";

import { Configure, TBrokerOptions } from "@tau/core";

import baseConfig from "./base.config";

const config: TBrokerOptions = Configure(
  "world",
  defaultsDeep(baseConfig, {
    database: "mongodb://localhost:27017",
    after_signin_controller: "createCharacter",
  })
);

export default config;
