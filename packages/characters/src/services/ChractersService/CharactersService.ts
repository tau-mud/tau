import { Context, ServiceSchema } from "moleculer";
import MongooseAdapter from "moleculer-db-adapter-mongoose";
import { model, Schema } from "mongoose";

// import DbService from "moleculer-db";
import { DataSourceService } from "@tau/world";

interface INameParams {
  name: string;
}

export interface ICharacter {
  _id: string;
  name: string;
}

import { ICharactersConfiguration } from "../../Configuration";

export function CharactersService(
  config: ICharactersConfiguration
): ServiceSchema {
  return {
    name: "tau.characters",
    mixins: [DataSourceService],
    adapter: new MongooseAdapter(config.database),
    model: model(
      "Character",
      new Schema({
        name: { type: String, unique: true, index: true },
        accountId: { type: String, index: true },
      })
    ),
    actions: {
      validateName(ctx: Context<INameParams>) {
        if (ctx.params.name.length < 4) {
          return Promise.resolve({
            valid: false,
            message: "nameTooShort",
          });
        }

        if (ctx.params.name.length > 10) {
          return Promise.resolve({
            valid: false,
            message: "nameTooLong",
          });
        }

        // validates if the name is alphabetic characters only
        if (!/^[a-zA-Z]+$/.test(ctx.params.name)) {
          return Promise.resolve({
            valid: false,
            message: "nameNotAlphabetic",
          });
        }

        //checks if the normalizedName is already in use
        return this.actions
          .find({
            query: {
              name: this.normalizeName(ctx.params.name),
            },
          })
          .then((result) => {
            if (result.length > 0) {
              return Promise.resolve({
                valid: false,
                message: "nameAlreadyInUse",
              });
            } else {
              return Promise.resolve({
                valid: true,
              });
            }
          });
      },
    },

    methods: {
      normalizeName(name: string): string {
        return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
      },
    },
  };
}
