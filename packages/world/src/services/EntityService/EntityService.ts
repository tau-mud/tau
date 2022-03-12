import { Context, ServiceSchema } from "moleculer";
import { IConfiguration } from "@tau/core";
import DbService from "moleculer-db";

interface IEntityServiceSchema extends ServiceSchema {}

export function EntityService(_config: IConfiguration): IEntityServiceSchema {
  return {
    name: "tau.entities",
    mixins: [DbService],

    settings: {
      fields: ["_id", "components", "data"],
    },

    actions: {
      create: {
        rest: "POST /entities",
        handler(ctx: Context<any, any>): Promise<any> {
          const components = Object.keys(ctx.params);
          return this._create(ctx, { ...ctx.params, components });
        },
      },
      update: {
        rest: "PUT /:id",
        handler(ctx: Context<any, any>): Promise<any> {
          const components = Object.keys(ctx.params);
          return this._update(ctx, { ...ctx.params, components });
        },
      },
    },
  };
}
