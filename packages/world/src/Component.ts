export interface IComponent {
  added: (entity: string) => Promise<any>;
  removed: (entity: string) => Promise<any>;
  updated: (entity: string) => Promise<any>;
  schema: any;
}
