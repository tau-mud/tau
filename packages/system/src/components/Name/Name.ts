interface INameComponent {
  value: string;
}

export const Name = {
  name: "name",
  schema: {
    value: { type: "string" },
  },
  build(attrs: INameComponent): INameComponent {
    return {
      value: attrs.value,
    };
  },
};
