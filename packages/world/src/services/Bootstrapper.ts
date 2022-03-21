import { ServiceSchema } from "core/node_modules/moleculer";
import { filter } from "lodash";
import Moleculer from "moleculer";

import { IEntity } from "../IEntity";

/**
 * @private
 */
export class Bootstrapper extends Moleculer.Service {
  readonly name = "tau.bootstrap";
  readonly dependencies = ["tau.config"];

  /**
   * @private
   */
  async started() {
    return this.broker
      .call("tau.config.getValue", { key: "world.loadDataSources" })
      .then((sources: Array<ServiceSchema>) =>
        this.broker
          .waitForServices(
            filter(
              sources.map((s) => s.name),
              (name) => name !== this.name
            )
          )
          .then(() => {
            this.logger.info("All services are loaded, bootstrapping world...");
            return this.broker.call("tau.config.getValue", {
              key: "world.loadDataSources",
            });
          })
          .then((sources: Array<ServiceSchema>) =>
            sources.forEach((source) => this.loadDataSource(source))
          )
      );
  }

  /**
   * @private
   */
  async loadDataSource(source: ServiceSchema) {
    this.logger.info(`loading source ${source}`);
    return this.broker
      .call(`${source}.find`)
      .then((entities: Array<IEntity>) =>
        Promise.all(entities.map((entity) => this.broker.call(`tau.entities.create`, entity)))
      );
  }
}
