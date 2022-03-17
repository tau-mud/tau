import { SystemService } from "./SystemService";
import { ServiceSchema } from "moleculer";

export function LocationSystem(): ServiceSchema {
  return {
    name: "tau.locations",
    mixins: [SystemService],
    filter: { location: { $exists: true } },
    dependencies: ["tau.containers"],
    methods: {
      beforeRegister(entity) {
        return this.broker
          .call("tau.entities.find", { query: { _id: entity.location } })
          .then(([location]) => {
            if (!location) {
              throw new Error("the parent location was not found");
            } else if (!location.container) {
              throw new Error("the parent location was not a container");
            }
          });
      },
      afterRegister(entity) {
        return this.broker.call("tau.containers.addToContainer", {
          container: entity.location,
          entity: entity,
        });
      },
    },
  };
}
