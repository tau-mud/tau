import { ComposeComponent, IComponentSchema } from "../Component";

export interface ILocationComponent {
  /**
   * The entity id of the component in which this component's entity is located.
   */
  location: string;
}

export interface ILocationComponentSchema
  extends IComponentSchema<ILocationComponent, ILocationComponent> {
  /**
   * Builds a {@linkcode LocationComponent}.
   *
   * @param {string} - the id of the container within which this component will be located.
   *
   * @return {ILocationComponent}
   */
}

/**
 * {@linkcode LocationComponents} define where an entity is located. The location must be the id of an
 * entity that has a {@linkcode ContainerComponent} defined.
 */
export const LocationComponent = <ILocationComponentSchema>ComposeComponent({
  name: "location",
  schema: {
    location: { type: "string" },
  },
  build: (location: string) => ({ location }),
  marshall: (obj: ILocationComponent) => ({ location: obj.location }),
  unmarshall: (component: ILocationComponent) => ({
    location: component.location,
  }),
});
