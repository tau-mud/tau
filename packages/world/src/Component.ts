import { last, defaultsDeep } from "lodash";
import { ValidationSchema } from "fastest-validator";
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
}

export function ComposeComponent(
  ...components: Array<IComponent<any>>
): IComponent<any> {
  const composedOf = {};

  components.forEach((component) => (composedOf[component.name] = component));

  const base = {
    name: last(components).name,
    composedOf: composedOf,
    build: (args: any = {}) =>
      components.reduce(
        (prev: object, cur: IComponent<any>) =>
          defaultsDeep(prev, cur.build(args[cur.name])),
        {}
      ),
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

  return components.reduce((prev, cur) => defaultsDeep(prev, cur), base);
}
