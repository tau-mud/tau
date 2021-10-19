import { ServiceSchema } from "moleculer";
import { IConfiguration } from "./Configure";

export type TService = (config: IConfiguration) => ServiceSchema;
