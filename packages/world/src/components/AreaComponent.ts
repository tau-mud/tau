import { IComponentSchema, ComposeComponent } from "../Component";

import {
  NameComponent,
  ContainerComponent,
  IContainerComponent,
  INameComponent,
} from ".";

export interface IAreaComponent extends INameComponent, IContainerComponent {}

export interface IAreaComponentSchema
  extends IComponentSchema<IAreaComponent, IAreaComponent> {
  /**
   * Builds an `AreaComponent`
   */
  build: () => IAreaComponent;
}

/**
 * An `AreaComponent` is a container to group rooms.
 */
export const AreaComponent = <IAreaComponentSchema>(
  ComposeComponent(ContainerComponent, NameComponent, {
    name: "area",
    schema: {},
    build: () => ({}),
    marshall: () => ({}),
    unmarshall: () => ({}),
  })
);
