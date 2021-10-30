import { IComponent } from "../../Component";

interface IContainerComponent {
  items: Array<string>;
}

export const ContainerComponent: IComponent<IContainerComponent> = {
  name: "container",
  schema: {
    items: { type: "array", items: "string", default: [] },
  },
  build: (items: Array<string> = []) => ({ items }),
  marshall: (items: Array<string> = []) => ({ items }),
  unmarshall: (component: IContainerComponent) => ({
    items: component.items,
  }),
};
