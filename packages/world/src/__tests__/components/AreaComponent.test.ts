import { AreaComponent } from "../../components";

describe("AreaComponent", () => {
  test("name should be set", () => {
    expect(AreaComponent.name).toEqual("area");
  });
  test("that it sets the default items", () => {
    expect(
      AreaComponent.build({
        name: "test",
      }).items
    ).toEqual([]);
  });
});
