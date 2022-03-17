import { ServiceSchema } from "moleculer";

export function RoomSystem(): ServiceSchema {
  return {
    name: "tau.rooms",
    filter: { room: { $exists: true } },
    dependencies: ["tau.containers", "tau.locations"],
    actions: {
      addToRoom(ctx) {
        return ctx.call("tau.containers.addToContainer", {
          container: ctx.params.room,
          entity: ctx.params.entity,
        });
      },
    },
  };
}
