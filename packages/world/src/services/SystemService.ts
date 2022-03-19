import { ServiceSchema } from "moleculer";

export const SystemService: ServiceSchema = {
  name: "",
  dependencies: ["tau.entities"],
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
