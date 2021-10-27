import { ServiceSchema } from "moleculer";
import Redis from "moleculer-redis"

import { IConfiguration } from "@tau/core";


export function ComponentsService(config: IConfiguration): ServiceSchema {
  return {
    name: "tau.world.components",
    mixins: [Redis],
    settings: {
      host: config.redis.host,
      port: config.redis.port
    },
  }
}
