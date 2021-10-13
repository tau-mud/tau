import net from "net";

export default {
  name: "mjolnir.portal",
  created() {
    this.server = net.createServer();
  },
  started() {
    return new Promise((resolve) => {
      this.sever.on("listening", resolve);
    });
  },
};
