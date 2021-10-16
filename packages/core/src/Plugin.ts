import { IConfiguration } from "./Configuration";

export class Plugin {
  name: string;
  services: Array<any>;

  constructor(_config: IConfiguration) {
    this.name = null;
    this.services = [];
  }
}
