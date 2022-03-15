import { ServiceSchema } from "moleculer";
import { JSONDataSourceService } from "@tau/world";

export function ZonesDataSourceService(config): ServiceSchema {
  return {
    name: "example.zones",
    mixins: [JSONDataSourceService],
    path: `${config.root}/data/zones`,
  };
}
