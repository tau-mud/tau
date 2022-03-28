import { Service, ServiceSchema, Context } from "moleculer";
import { IEntity } from "./IEntity";

export interface IEntityDiff {
  [key: string]: any;
}

/**
 * This is a [Moleculer mixin](https://moleculer.services/docs/0.14/services.html#Mixins) that
 * can be used to create systems within Tau's Entity Component System framework. Whenever a game
 * entity is created, updated, or destroyed, the system will be notified, and apply its filter to
 * the entity. If the entity matches, it will call the appropriate callbacks.
 *
 * ### Filters
 * Filters are the method by which a system determines whether an entity should be processed. Every
 * system should have a filter, otherwise it will match every entity. Filters are simply
 * [NeDB queries](https://github.com/louischatriot/nedb#basic-querying) that are runa gainst the
 * {@link @tau/world.Services.Entities.Registry} service, which is simply an NeDB in memory database.
 *
 * ### Callbacks
 * Callbacks are the method by which a system processes an entity. Developers can override the
 * callbacks to implement behaviours when the entity is created, updated, or destroyed.
 **/
export abstract class System extends Service {
  preParse(schema: ServiceSchema) {
    const events = schema.events || {};

    schema.attributes.forEach((attribute: string) => {
      events[`tau.attributes.${attribute}.added`] = schema[`${attribute}Added`] || (() => {});
      events[`tau.attributes.${attribute}.updated`] = schema[`${attribute}Updated`] || (() => {});
      events[`tau.attributes.${attribute}.removed`] = schema[`${attribute}Removed`] || (() => {});
    });

    return { ...schema, events };
  }
}
