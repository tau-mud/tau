import { IComponentSchema, ComposeComponent } from "../Component";

export interface INameComponent {
  /**
   * The name of the component.
   */
  name: string;
}

export interface INameComponentSchema
  extends IComponentSchema<INameComponent, INameComponentSchema> {
  /**
   * Builds a name component.
   *
   * @param {string} name - the name of the entity this component is attached to
   *
   * @return {INameComponent}
   */
  build: (name: string) => INameComponent;
}

/**
 * Defines a name for the component.
 */
export const NameComponent = ComposeComponent({
  name: "name",
  schema: {
    name: { type: "string" },
  },
  build: (name: string): INameComponent => ({ name }),
  marshall: (obj: any): INameComponent => ({ name: obj.name }),
  unmarshall(component: INameComponent) {
    return {
      name: component.name,
    };
  },
});
