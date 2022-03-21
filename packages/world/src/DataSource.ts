import { Context, GenericObject, ServiceSchema } from "moleculer";

import DbService from "moleculer-db";

/**
 * A data source is a [Moleculer service](https://moleculer.services/docs/0.12/service.html)
 * that manages the persistence and loading of entities. DataSources can be created
 * by [mixing in](https://moleculer.services/docs/0.12/service.html#Mixins) the `DataSource`
 * service.
 */
export const DataSource: ServiceSchema = {
  name: "",
  mixins: [DbService],
  hooks: {
    before: {
      update(ctx: Context<GenericObject>) {
        delete ctx.params.__source;
      },
    },
    after: {
      find(_ctx: Context, res: GenericObject) {
        return res.map((obj: GenericObject) => {
          return { ...obj, _source: this.name };
        });
      },
    },
  },
};
