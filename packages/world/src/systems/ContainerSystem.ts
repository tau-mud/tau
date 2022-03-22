import { ServiceSchema } from "moleculer";
import { System } from "../System";

export function ContainerSystem(): ServiceSchema {
  return {
    name: "tau.containers",
    mixins: [System],
    filter: { container: { $exists: true } },
    actions: {
      addToContainer(ctx) {
        return this.findEntity(ctx, ctx.params.entity_id)
          .then(() => this.findEntity(ctx, ctx.params.container))
          .then((container) => ({
            ...container,
            container: [...container.container, ctx.params.entity._id],
          }))
          .then((container) => this.updateEntity(ctx, container))
          .then(() =>
            ctx.emit(`tau.containers.addedToContainer.${ctx.params.container}`, ctx.params.entity)
          )
          .catch((err) =>
            this.logger.error(
              `could not add entity with id '${ctx.params.entity._id}' to container '${ctx.params.container}'`,
              err
            )
          );
      },
      removeFromContainer(ctx) {
        return this.findEntity(ctx, ctx.params.entity._id)
          .then(() => this.find(ctx, { _id: ctx.params.container }))
          .then((container) => ({
            ...container,
            container: container.container.filter((id) => id !== ctx.params.entity._id),
          }))
          .then((container) => this.updateEntity(ctx, container))
          .then(() =>
            ctx.emit(
              `tau.containers.removedFromContainer.${ctx.params.container}`,
              ctx.params.entity
            )
          )
          .catch((err) =>
            this.logger.error(
              `could not remove entity with id '${ctx.params.entity._id}' from container '${ctx.params.container}'`,
              err
            )
          );
      },
    },
    methods: {},
  };
}
