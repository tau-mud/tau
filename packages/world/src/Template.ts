export type TTemplate = () => JSX.Element;

export interface ITemplate {
  [key: string]: () => JSX.Element;
}
