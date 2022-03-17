import { ServiceSchema } from "moleculer";
import DbService from "moleculer-db";
import { IWorldConfiguration } from "../../Configuration";
import { flatten, keys } from "lodash";

interface IEntityServiceSchema extends ServiceSchema {}

export interface IEntity {
  id: string;
}

export function EntityService(
  config: IWorldConfiguration
): IEntityServiceSchema {
  return {
    name: "tau.entities",
    mixins: [DbService],
    dependencies: config.world.loadDataSources || [],
    settings: {
      loadDataSources: config.world.loadDataSources,
    },
    entityCreated(entity) {
      this.broker.emit("tau.entities.created", entity);
    },
    entityUpdated(entity) {
      this.broker.emit("tau.entities.updated", entity);
    },
    entityRemoved(entity) {
      this.broker.emit("tau.entities.removed", entity);
    },
  };
}
