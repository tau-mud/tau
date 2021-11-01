import { ComposeComponent, IComponentSchema } from "../Component";

export type TContainerComponentSchema = IComponentSchema<
  IContainerComponent,
  IContainerComponent
>;

export interface IContainerComponent {
  /**
   * Entity ids of the items contained within this component
   */
  items: Array<string>;
}

export interface IContainerComponentSchema extends TContainerComponentSchema {
  /**
   * Builds a container component.
   */
  build: () => IContainerComponent;
  marshall: (comp: IContainerComponent) => IContainerComponent;
  unmarshall: (comp: IContainerComponent) => IContainerComponent;
}

/**
 * Allows etities to contain other entities. Contained entities are given the
 * `LocationComponent`, which points to the containing entity.
 */
export const ContainerComponent = ComposeComponent<IContainerComponentSchema>({
  name: "container",
  schema: {
    items: { type: "array", items: "string", default: [] },
  },
  build: () => ({ items: [] }),
  marshall: (comp: IContainerComponent) => ({ items: comp.items }),
  unmarshall: (component: IContainerComponent) => ({
    items: component.items,
  }),
});
