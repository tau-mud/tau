import { NameComponent } from "../../components";

describe("NameComponent", () => {
  test("build", () => {
    expect(NameComponent.build("test").name).toEqual("test");
  });

  test("marshall", () => {
    expect(NameComponent.marshall({ name: "test" }).name).toEqual("test");
  });

  test("unmarshall", () => {
    expect(NameComponent.unmarshall({ name: "test" })).toEqual({
      name: "test",
    });
  });
});
