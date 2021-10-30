import { ServiceSchema } from "moleculer";
import Redis from "moleculer-redis";

import { IWorldPlugin } from "../../WorldPlugin";

export function ComponentsService(config: IWorldPlugin): ServiceSchema {
  return {
    name: "tau.world.components",
    mixins: [Redis],
    settings: {
      host: config.redis.host,
      port: config.redis.port,
      componentTypes: config.world.componentTypes,
    },
  };
}
