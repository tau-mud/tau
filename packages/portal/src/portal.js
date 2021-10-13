import net from "net";

import Connection from "./connection";

export default {
  name: "mjolnir.portal",
  created() {
    this.server = net.createServer();
  },
  started() {
    return new Promise((resolve) => {
      this.server.on("listening", resolve);
      this.server.on("connection", (socket) => {
        this.broker.createService(new Connection(this.broker, socket));
      });
      this.server.listen(4000, "127.0.0.1");
    });
  },
};
