import { ComposeComponent, IComponent } from "../Component";

const BaseComponent: IComponent<any> = {
  name: "base",
  schema: {
    base: { type: "boolean" },
  },
  build: (_obj: any) => ({ base: true }),
  marshall: (_obj: any) => ({ base: true }),
  unmarshall: (_obj: any) => ({ base: true }),
};

const SecondComponent: IComponent<any> = {
  name: "base",
  schema: {
    second: { type: "boolean" },
  },
  build: (_obj: any) => ({ second: true }),
  marshall: (_obj: any) => ({ second: true }),
  unmarshall: (_obj: any) => ({ second: true }),
};

const ThirdComponent: IComponent<any> = {
  name: "base",
  schema: {
    third: { type: "boolean" },
  },
  build: (obj: any) => ({
    third: true,
  }),
  marshall: (obj: any) => obj,
  unmarshall: (obj: any) => obj,
};

describe("ComposeComponent", () => {
  test("name should be set", () => {
    const component = ComposeComponent(
      ThirdComponent,
      SecondComponent,
      BaseComponent
    );

    expect(component.name).toBe("base");
  });

  test("schema should be correct", () => {
    const component = ComposeComponent(
      ThirdComponent,
      SecondComponent,
      BaseComponent
    );

    expect(component.schema.base.type).toBe("boolean");
    expect(component.schema.third.type).toBe("boolean");
    expect(component.schema.second.type).toBe("boolean");
  });

  test("build should be reduced", () => {
    const component = ComposeComponent(
      ThirdComponent,
      SecondComponent,
      BaseComponent
    );

    const res = component.build();

    expect(res.first);
    expect(res.second);
  });

  test("marshall should be reduced", () => {
    const component = ComposeComponent(
      ThirdComponent,
      SecondComponent,
      BaseComponent
    );

    const res = component.marshall();

    expect(res.first);
    expect(res.second);
  });

  test("unmarshall should be reduced", () => {
    const component = ComposeComponent(
      ThirdComponent,
      SecondComponent,
      BaseComponent
    );

    const res = component.unmarshall({});

    expect(res.first);
    expect(res.second);
  });
});
