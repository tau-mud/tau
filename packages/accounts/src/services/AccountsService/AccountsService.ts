import { Context } from "moleculer";

import DbService from "moleculer-db";
import MongooseAdapter from "moleculer-db-adapter-mongoose";
import { Document, model, Schema } from "mongoose";

import { IAccountsConfiguration } from "../../Configuration";

interface IValidateUsernameParams {
  username: string;
}

export function AccountsService(config: IAccountsConfiguration) {
  return {
    name: "tau.accounts",
    mixins: [DbService],
    adapter: new MongooseAdapter(`${config.database}/accounts`),
    model: model(
      "Account",
      Schema({
        username: { type: String },
        normalizedUsername: { type: String },
        encryptedPassword: { type: String },
      })
    ),
    actions: {
      validateUsername(ctx: Context<IValidateUsernameParams>) {
        if (ctx.params.username == "") {
          return Promise.resolve({
            valid: false,
            message: "usernameEmpty",
          });
        }

        if (ctx.params.username.length < 4) {
          return Promise.resolve({
            valid: false,
            message: "usernameTooShort",
          });
        }

        if (ctx.params.username.length > 10) {
          return Promise.resolve({
            valid: false,
            message: "usernameTooLong",
          });
        }

        if (!ctx.params.username.match(/^[a-z0-9]+[a-z0-9_\-\.]?[a-z0-9]?$/i)) {
          return Promise.resolve({
            valid: false,
            message: "usernameInvalidFormat",
          });
        }

        return this.actions
          .find({
            query: { username: ctx.params.username },
            limit: 1,
          })
          .then((res: Array<Document>) => {
            if (res.length > 0) {
              return {
                valid: false,
                message: "usernameTaken",
              };
            } else {
              return {
                valid: true,
              };
            }
          });
      },
    },
  };
}
