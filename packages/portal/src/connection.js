import { Service } from "moleculer";
import { v4 as uuidv4 } from "uuid";

export default class Connection extends Service {
  constructor(broker, socket) {
    super(broker);
    const uuid = uuidv4();

    this.parseServiceSchema({
      name: `mjolnir.portal.connections.${uuid}`,
      settings: {
        uuid,
      },
    });
  }
}
