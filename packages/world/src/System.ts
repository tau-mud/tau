import { Context, ServiceSchema } from "moleculer";

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
export const System: ServiceSchema = {
  name: "",
  dependencies: ["tau.entities"],

  /**
   * @private
   */
  created() {
    this.filter = this.schema.filter;
    this.entities = {};
  },

  events: {
    "tau.entities.created"(ctx) {
      return this.broker
        .call("tau.entities.find", {
          query: { _id: ctx.params._id, ...this.filter },
        })
        .then((entities) => entities.length > 0)
        .then((hasEntities) => {
          if (hasEntities) {
            this.register(ctx.params);
          }
        });
    },
    "tau.entities.updated"(ctx) {
      return this.broker
        .call("tau.entities.find", {
          query: { _id: ctx.params._id, ...this.filter },
        })
        .then((entities) => entities.length > 0)
        .then((hasEntities) => {
          if (hasEntities) {
            this.updated(ctx.params);
          }
        });
    },
    isRegistered(ctx) {
      return this.entities[ctx.params._id] !== undefined;
    },
  },
  actions: {
    getEntity(ctx) {
      return this.entities[ctx.params._id];
    },
  },
  methods: {
    beforeRegister(_entity) {
      return Promise.resolve();
    },
    register(entity) {
      return this.beforeRegister(entity)
        .then(() => {
          this.logger.debug(`registering entity '${entity._id}'`);
          this.entities[entity._id] = entity;
        })
        .then(() => this.afterRegister(entity))
        .catch((err) => {
          this.logger.error(`error registering entity '${entity._id}'`, err);
        });
    },
    afterRegister(_entity) {
      return Promise.resolve();
    },
    updated(entity) {
      return Promise.resolve();
    },
    updateEntity(ctx, entity) {
      return ctx.call("tau.entities.update", entity);
    },
    findEntity(ctx, entityId) {
      return ctx
        .call("tau.entities.find", {
          query: { _id: entityId },
        })
        .then(([entity]) => {
          if (!entity) {
            throw new Error(`Entity not found with id '${entityId}'`);
          }
          return entity;
        });
    },
  },
};
