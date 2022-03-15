import { Context, GenericObject, ServiceSchema } from "moleculer";

import DbService from "moleculer-db";

/**
 * A DataSourceService is a [Moleculer service]() that manages entities within the game. New DataSources can be created
 * by mixing in the `DataSourceService` class.
 */
export const DataSourceService: ServiceSchema = {
  name: "",
  mixins: [DbService],
  after: {
    find(_ctx: Context, res: GenericObject) {
      return res.map((obj: GenericObject) => {
        return { ...obj, _source: this.name };
      });
    },
  },
};
