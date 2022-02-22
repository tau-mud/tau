import { Context } from "moleculer";

import { IConfiguration } from "@tau/core";

interface ILoadParams {
  id: string;
}

export function EntityLoaderService(_config: IConfiguration) {
  return {
    actions: {
      find(ctx: Context<ILoadParams>) {
        return this.adapter.find(ctx.params.id);
      },
      all(ctx: Context<ILoadParams>) {
        return this.adapter.all();
      },
    },
  };
}
