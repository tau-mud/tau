import { last, defaultsDeep } from "lodash";
import FastestValidator, {
  ValidationError,
  ValidationSchema,
} from "fastest-validator";
import { GenericObject } from "moleculer";

interface ICompositionMap {
  [key: string]: IComponentSchema<any>;
}

/**
 * Definition of a component.
 */
export interface IComponentSchema<Type> {
  _name: string;
  schema: ValidationSchema<any>;
  build: (...args: any) => Type;
  marshall: (...args: any) => Type;
  unmarshall: (component: Type) => GenericObject;
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
export function ComposeComponent(
  ...components: Array<IComponentSchema<any>>
): IComponentSchema<any> {
  const composedOf = {};

  components.forEach((component) => (composedOf[component._name] = component));

  const base = {
    name: last(components)._name,
    composedOf: composedOf,
    build(args: any = {}) {
      const obj = components.reduce(
        (prev: object, cur: IComponentSchema<any>) => {
          let argsForBuild: any;

          if (typeof args === "object") {
            argsForBuild = args[cur._name];
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
        (prev: object, cur: IComponentSchema<any>) =>
          defaultsDeep(prev, cur.marshall(obj)),
        {}
      ),
    unmarshall: (obj: object) =>
      components.reduce(
        (prev: object, cur: IComponentSchema<any>) =>
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
