import Moleculer from "moleculer";

export class Service
  extends Moleculer.Service
  implements Moleculer.ServiceSchema<Moleculer.ServiceSettingSchema>
{
  readonly name: string;
  readonly logger: Moleculer.LoggerInstance;

  constructor(broker: Moleculer.ServiceBroker) {
    super(broker);
  }
}
