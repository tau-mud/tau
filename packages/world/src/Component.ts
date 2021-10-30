import { last, defaultsDeep } from "lodash";
import FastestValidator, {
  ValidationError,
  ValidationSchema,
} from "fastest-validator";
import { GenericObject } from "moleculer";

interface ICompositionMap {
  [key: string]: IComponent<any>;
}

export interface IComponent<Type> {
  name: string;
  schema: ValidationSchema<any>;
  build: (...args: any) => Type;
  marshall: (...args: any) => Type;
  unmarshall: (component: Type) => GenericObject;
  composedOf?: ICompositionMap;
  validate?: (schema: ValidationSchema<any>) => true | ValidationError;
}

export function ComposeComponent(
  ...components: Array<IComponent<any>>
): IComponent<any> {
  const composedOf = {};

  components.forEach((component) => (composedOf[component.name] = component));

  const base = {
    name: last(components).name,
    composedOf: composedOf,
    build(args: any = {}) {
      const obj = components.reduce((prev: object, cur: IComponent<any>) => {
        let argsForBuild: any;

        if (typeof args === "object") {
          argsForBuild = args[cur.name];
        } else {
          argsForBuild = args;
        }

        return defaultsDeep(prev, cur.build(argsForBuild));
      }, {});

      const valid = this.validate(obj);

      if (valid === true) {
        return obj;
      } else {
        throw valid;
      }
    },
    marshall: (obj: object) =>
      components.reduce(
        (prev: object, cur: IComponent<any>) =>
          defaultsDeep(prev, cur.marshall(obj)),
        {}
      ),
    unmarshall: (obj: object) =>
      components.reduce(
        (prev: object, cur: IComponent<any>) =>
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
