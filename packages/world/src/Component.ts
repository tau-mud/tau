import { last, defaultsDeep } from "lodash";
import FastestValidator, {
  ValidationError,
  ValidationSchema,
} from "fastest-validator";

export type TGenericComponentSchema = IComponentSchema<any, any>;

interface ICompositionMap {
  [key: string]: TGenericComponentSchema;
}

export interface IComponentSchema<ComponentType, UnmarshalledType> {
  name: string;
  schema: ValidationSchema<any>;
  build: (args?: any) => ComponentType;
  marshall: (obj: UnmarshalledType) => ComponentType;
  unmarshall: (component: ComponentType) => UnmarshalledType;
  composedOf?: ICompositionMap;
  validate?: (schema: ValidationSchema<any>) => true | ValidationError;
}

/**
 * Creates a new Component from a provided set of IComponentSchema.
 *
 * @param {Array<IComponentSchema<any>} components - the schmea from which to combine a single full
 * component schema.
 *
 * @return {IComponentSchema<any>}
 */
export function ComposeComponent<T extends TGenericComponentSchema>(
  ...components: Array<TGenericComponentSchema>
): T {
  const composedOf = {};

  components.forEach((component) => (composedOf[component.name] = component));

  const base = {
    name: last(components).name,
    composedOf: composedOf,
    build(args: any = {}) {
      const obj = components.reduce(
        (prev: object, cur: TGenericComponentSchema) => {
          let argsForBuild: any;

          if (typeof args === "object") {
            argsForBuild = args[cur.name];
          } else {
            argsForBuild = args;
          }

          return defaultsDeep(prev, cur.build(argsForBuild));
        },
        {}
      );

      const valid = this.validate(obj);

      if (valid === true) {
        return obj;
      } else {
        throw valid;
      }
    },
    marshall: (obj: object) =>
      components.reduce(
        (prev: object, cur: TGenericComponentSchema) =>
          defaultsDeep(prev, cur.marshall(obj)),
        {}
      ),
    unmarshall: (obj: object) =>
      components.reduce(
        (prev: object, cur: TGenericComponentSchema) =>
          defaultsDeep(prev, cur.unmarshall(obj)),
        {}
      ),
  };

  const component = components.reduce(
    (prev, cur) => defaultsDeep(prev, cur),
    base
  );

  const v = new FastestValidator();
  component.validate = v.compile(component.schema);

  return component;
}
