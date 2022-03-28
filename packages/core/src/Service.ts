import Moleculer, { ServiceSchema } from "moleculer";

export class Service extends Moleculer.Service implements ServiceSchema {
  constructor(broker: Moleculer.ServiceBroker, schema: Moleculer.ServiceSchema) {
    super(broker, schema);
  }

  parseServiceSchema(schema: Moleculer.ServiceSchema) {
    if (schema.preParse) {
      schema = schema.preParse(schema);
    }

    super.parseServiceSchema(schema);
  }
}
