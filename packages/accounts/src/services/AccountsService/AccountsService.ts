import { Context } from "moleculer";

import DbService from "moleculer-db";
import MongooseAdapter from "moleculer-db-adapter-mongoose";
import { Document, model, Schema } from "mongoose";

import { IAccountsConfiguration } from "../../Configuration";

interface IValidateUsernameParams {
  username: string;
}

interface IValidatePasswordParams {
  password: string;
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
        normalizedUsername: { type: String, unique: true, index: true },
        encryptedPassword: { type: String },
      })
    ),
    actions: {
      validatePassword(ctx: Context<IValidatePasswordParams>) {
        if (ctx.params.password.length < 6) {
          return Promise.resolve({
            valid: false,
            message: "passwordTooShort",
          });
        }

        if (!ctx.params.password.match(/[^a-zA-Z\d]/)) {
          return Promise.resolve({
            valid: false,
            message: "passwordMustContainSymbol",
          });
        }

        if (!ctx.params.password.match(/[a-z]/)) {
          return Promise.resolve({
            valid: false,
            message: "passwordMustContainLowercase",
          });
        }

        if (!ctx.params.password.match(/[A-Z]/)) {
          return Promise.resolve({
            valid: false,
            message: "passwordMustContainUppercase",
          });
        }

        if (!ctx.params.password.match(/[0-9]/)) {
          return Promise.resolve({
            valid: false,
            message: "passwordMustContainDigit",
          });
        }

        return Promise.resolve({ valid: true });
      },
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
