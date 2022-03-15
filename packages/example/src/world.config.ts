import { defaultsDeep } from "lodash";

import { Configure, TBrokerOptions } from "@tau/core";

import baseConfig from "./base.config";

const config: TBrokerOptions = Configure(
  "world",
  defaultsDeep(baseConfig, {
    database: "mongodb://localhost:27017/tau",
  })
);

export default config;
