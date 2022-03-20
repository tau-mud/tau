import { ServiceSchema } from "moleculer";

/**
 * Manages rooms and movement between rooms.
 **/
export function RoomSystem(): ServiceSchema {
  return {
    name: "tau.rooms",
    dependencies: ["tau.containers", "tau.locations"],
  };
}
