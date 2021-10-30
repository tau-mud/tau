import { IComponent, ComposeComponent } from "../Component";

interface INameComponent {
  name: string;
}

const component = {
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
};

export const NameComponent = <IComponent<INameComponent>>(
  ComposeComponent(component)
);
