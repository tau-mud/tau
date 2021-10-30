import { IComponent } from "../../Component";

interface INameComponent {
  name: string;
}

export const NameComponent: IComponent<INameComponent> = {
  name: "name",
  schema: {
    name: { type: "number" },
  },
  build: (name: string): INameComponent => ({ name }),
  marshall: (name: string): INameComponent => ({ name }),
  unmarshall(component: INameComponent) {
    return {
      name: component.name,
    };
  },
};
