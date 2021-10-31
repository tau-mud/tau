import { NameComponent, ContainerComponent } from "../";

import { ComposeComponent } from "../Component";

export const AreaComponent = ComposeComponent(
  NameComponent,
  ContainerComponent,
  {
    name: "area",
    schema: {},
    build: () => ({}),
    marshall: () => ({}),
    unmarshall: () => ({}),
  }
);
