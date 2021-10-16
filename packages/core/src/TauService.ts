import {
  ServiceActions,
  GenericObject,
  LoggerInstance,
  ServiceBroker,
} from "moleculer";

export abstract class TauService {
  name: string;
  settings: GenericObject;
  logger: LoggerInstance;
  broker: ServiceBroker;
  events: any;
  actions?: ServiceActions;

  constructor() {
    this.events = [];
  }
}
