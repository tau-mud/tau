import DbService from "moleculer-db";
import MongooseAdapter from "moleculer-db-adapter-mongoose";
import { model, Schema } from "mongoose";

import { IAccountsConfiguration } from "../../Configuration";

export function AccountsService(config: IAccountsConfiguration) {
  return {
    name: "tau.accounts",
    mixins: [DbService],
    adapter: new MongooseAdapter(`${config.database}/accounts`),
    model: model(
      "Account",
      Schema({
        username: { type: String },
        encryptedPassword: { type: String },
      })
    ),
  };
}
