import Redis from "moleculer-redis"
import { ServiceSchema } from "moleculer";

import { IConfiguration } from "@tau/core";

interface IEntityServiceSchema extends ServiceSchema {}

export function EntityService(config: IConfiguration): IEntityServiceSchema {
  return {
    name: "tau.world.entities",
    settings: {
      host: config.redis.host,
      port: config.redis.port
    },
    mixins: [Redis]
  }
}
