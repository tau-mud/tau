import { defaultsDeep } from "lodash";
import { BrokerOptions } from "moleculer";

import { Configure } from "@tau/core";

import baseConfig from "./base.config";

const config: BrokerOptions = Configure("portal", defaultsDeep(baseConfig, {}));

export default config;
