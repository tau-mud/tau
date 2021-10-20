import { ISessionContext } from "./services/SessionService";

export interface IController {
  name: string;
  start(): Promise<any>;
  resume(): Promise<any>;
}

export type TController = (session: ISessionContext) => IController;
