import { AreaComponent } from "../../components";

describe("AreaComponent", () => {
  test("name should be set", () => {
    expect(AreaComponent.build().name).toEqual("area");
  });
});
