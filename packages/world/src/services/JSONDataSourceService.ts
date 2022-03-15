import { DataSourceService } from "./DataSourceService";
import { ServiceSchema } from "moleculer";
import glob from "glob";
import path from "path";
import * as fs from "fs";

export const JSONDataSourceService: ServiceSchema = {
  name: "",
  mixins: [DataSourceService],
  created() {
    this.path = this.schema.path;
  },
  started() {
    this.logger.info(`loading JSON data from '${this.path}'`);
    return new Promise((resolve, reject) => {
      glob(path.join(this.path, "**/*.json"), (err, files) => {
        if (err) {
          reject(err);
        } else {
          resolve(files);
        }
      });
    })
      .then((files: Array<string>) => {
        return Promise.all(
          files.map((file) => {
            return new Promise((resolve, reject) => {
              fs.readFile(file, (err, data) => {
                if (err) {
                  reject(err);
                } else {
                  JSON.parse(data.toString()).forEach((entity) => {
                    this.logger.debug(`adding entity '${entity._id}'`);
                    this.actions.create(entity);
                  });
                }
              });
            });
          })
        );
      })
      .then(() => Promise.resolve());
  },
};
