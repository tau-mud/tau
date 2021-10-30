import { IComponent } from "../../Component";

interface ILocationComponent {
  location: string;
}

export const LocationComponent: IComponent<ILocationComponent> = {
  name: "location",
  schema: {
    location: { type: "string" },
  },
  build: (location: string) => ({ location }),
  marshall: (location: string) => ({ location }),
  unmarshall: (obj: ILocationComponent) => ({
    location: obj.location,
  }),
};
