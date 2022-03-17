import { IWorldConfiguration } from "../Configuration";
import { ServiceSchema } from "moleculer";
import { filter, keys } from "lodash";

export function BootstrapService(config: IWorldConfiguration): ServiceSchema {
  return {
    name: "tau.bootstrap",
    started() {
      return this.broker
        .waitForServices(
          filter(
            this.broker.runner.config.services.map((s) => s.name),
            (name) => name !== this.name
          )
        )
        .then(() => {
          this.logger.info("All services are loaded, bootstrapping world...");
          return this.broker.call("tau.config.getValue", {
            key: "world.loadDataSources",
          });
        })
        .then((sources) =>
          sources.forEach((source) => this.loadDataSource(source))
        );
    },
    methods: {
      loadDataSource(source) {
        this.logger.info(`loading source ${source}`);
        return this.broker
          .call(`${source}.find`)
          .then((entities) =>
            Promise.all(
              entities.map((entity) =>
                this.broker.call(`tau.entities.create`, entity)
              )
            )
          );
      },
    },
  };
}
