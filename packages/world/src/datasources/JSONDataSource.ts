import { DataSource } from "../DataSource";
import { ServiceSchema } from "moleculer";
import glob from "glob";
import path from "path";
import * as fs from "fs";
import { IEntity } from "../IEntity";

/**
 * This (Moleculer mixin)[https://moleculer.services/docs/0.12/service.html#Mixins] helps to
 * define JSON data sources, allowing all `*.json` files in the specified directories to be loaded.
 */
export const JSONDataSource: ServiceSchema = {
  name: "",
  mixins: [DataSource],
  created() {
    this.path = this.schema.path;
  },
  async started() {
    this.logger.info(`loading JSON data from '${this.path}'`);
    return new Promise((resolve, reject) => {
      glob(path.join(this.path, "**/*.json"), (err: Error, files: Array<string>) => {
        if (err) {
          reject(err);
        } else {
          resolve(files);
        }
      });
    }).then((files: Array<string>) => {
      files.map((file) => {
        fs.readFile(file, (err, data) => {
          if (err) {
            throw err;
          } else {
            JSON.parse(data.toString()).forEach((entity: IEntity) => {
              this.logger.debug(`adding entity '${entity._id}'`);
              this.actions.create(entity);
            });
          }
        });
      });
    });
  },
};
