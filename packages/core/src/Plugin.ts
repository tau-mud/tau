import { IConfiguration } from "./Configuration";

export abstract class Plugin {
  public abstract name: string;
  public abstract services: Array<any>;

  constructor(_config: IConfiguration) {}
}
