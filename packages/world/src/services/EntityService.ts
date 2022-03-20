import Moleculer, { ServiceSchema } from "moleculer";
import DbService from "moleculer-db";
import { IEntity } from "../IEntity";

/**
 * Manages entities within the game world. This service will wait for all of the configured
 * sources to start before it will start.
 *
 * ## Moleculer Service Name
 * `tau.entities`
 *
 * ## Moleculer Mixins
 * * [DbService](https://github.com/moleculerjs/moleculer-db/tree/master/packages/moleculer-db)
 *
 * ## Moleculer Dependencies
 * * _All configured datasSources_
 */
export class EntityService extends Moleculer.Service {
  readonly name = "tau.entities";
  readonly mixins = [DbService];

  /**
   * @private
   **/
  created() {
    this.loadDataSources = [];
  }

  /**
   * @private
   **/
  started() {
    return this.broker.waitForServices(this.loadDataSources);
  }

  /**
   * @private
   **/
  entityCreated(entity: IEntity) {
    this.broker.emit("tau.entities.created", entity);
  }

  /**
   * @private
   **/
  entityUpdated(entity: IEntity) {
    this.broker.emit("tau.entities.updated", entity);
  }

  /**
   * @private
   **/
  entityRemoved(entity: IEntity) {
    this.broker.emit("tau.entities.removed", entity);
  }
}
