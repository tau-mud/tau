import { ISessionContext } from "./services/SessionService";

export interface IController {
  start(): Promise<any>;
}

export type TController = (session: ISessionContext) => IController;
