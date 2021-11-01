import { ComposeComponent, IComponentSchema } from "../Component";
import { ContainerComponent, IContainerComponent } from "./ContainerComponent";
import { LocationComponent, ILocationComponent } from "./LocationComponent";
import { NameComponent, INameComponent } from "./NameComponent";

export interface IRoomComponent
  extends ILocationComponent,
    INameComponent,
    IContainerComponent {}

export interface IRoomComponentOptions {
  /**
   * The name of the room
   */
  name: string;
  /**
   * The area the room is located within
   */
  location: string;
}

export interface IRoomComponentSchema
  extends IComponentSchema<IRoomComponent, IRoomComponentSchema> {
  /**
   * Builds a room component.
   *
   * @param {IRoomComponentOptions} opts - room component options
   *
   * @return {IRoomComponent}
   */
  build: (opts: IRoomComponentOptions) => IRoomComponent;
}

/**
 * A RoomComponent defines a room in which other world entities may exist.
 */
export const RoomComponent = <IRoomComponentSchema>(
  ComposeComponent(ContainerComponent, LocationComponent, NameComponent, {
    name: "room",
    schema: {},
    build: (opts: IRoomComponent) => ({}),
    marshall: (comp: IRoomComponent) => comp,
    unmarshall: (comp: IRoomComponent) => comp,
  })
);
