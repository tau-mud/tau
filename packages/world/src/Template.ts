import { GenericObject } from "moleculer";

export type TTemplate = (context: GenericObject) => JSX.Element;

export interface ITemplate {
  [key: string]: TTemplate;
}
