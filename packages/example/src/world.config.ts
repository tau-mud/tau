import { defaultsDeep } from "lodash";
import { BrokerOptions } from "moleculer";

import { Configure } from "@tau/core";

import baseConfig from "./base.config";

const config: BrokerOptions = Configure(
  "world",
  defaultsDeep(baseConfig, {
    database: "mongodb://localhost:27017/tau",
  })
);

export default config;
