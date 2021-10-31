import { ContainerComponent } from "../../components";

describe("ContainerComponent", () => {
  test("has the correct name", () => {
    expect(ContainerComponent.name).toEqual("container");
  });

  test("it has the default items set", () => {
    expect(ContainerComponent.build().items).toEqual([]);
  });
});
