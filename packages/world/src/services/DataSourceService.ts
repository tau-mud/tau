import { Context, ServiceSchema } from "moleculer";

import DbService from "moleculer-db";

export const DataSourceService = {
  mixins: [DbService],
};
