import { IConfiguration } from "@tau/core/lib/Configure";

export interface ICharactersConfiguration extends IConfiguration {
  database?: string;
}
