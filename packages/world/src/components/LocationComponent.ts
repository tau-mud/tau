import { ComposeComponent, IComponentSchema } from "../Component";

/**
 * @private
 */
interface ILocationComponentSchema
  extends IComponentSchema<ILocationComponent> {
  build: (location: string) => ILocationComponent;
  marshall: (location: string) => ILocationComponent;
  unmarshall: (component: ILocationComponent) => ILocationComponent;
}

/**
 * Determines the location of an entity within the game world.
 *
 * @param {string} location - the id of the entity at which the component is located
 */
interface ILocationComponent {
  location: string;
}

/**
 *
 */
export const LocationCompoonent: ILocationComponentSchema = ComposeComponent({
  name: "location",
  schema: {
    location: { type: "string" },
  },
  build: (location: string) => ({ location }),
  marshall: (location: string) => ({ location }),
  unmarshall: (component: ILocationComponent) => ({
    location: component.location,
  }),
});
