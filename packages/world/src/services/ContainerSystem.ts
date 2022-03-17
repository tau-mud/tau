import { ServiceSchema } from "moleculer";
import { SystemService } from "./SystemService";

export function ContainerSystem(): ServiceSchema {
  return {
    name: "tau.containers",
    mixins: [SystemService],
    filter: { container: { $exists: true } },
    actions: {
      addToContainer(ctx) {
        return this.broker
          .call("tau.entities.find", { query: { _id: ctx.params.entity._id } })
          .then(([entity]) => {
            if (!entity) {
              throw new Error(
                `Entity not found with id '${ctx.params.entity._id}'`
              );
            }
          })
          .then(() =>
            this.broker.call("tau.entities.find", {
              query: { _id: ctx.params.container },
            })
          )
          .then(([container]) => {
            if (!container) {
              throw new Error(`Container ${ctx.params.container} not found`);
            }
            return container;
          })
          .then((container) => {
            let contents = container.container;
            contents = [...contents, ctx.params.entity._id];

            return this.broker.call("tau.entities.update", {
              ...container,
              container: contents,
            });
          })
          .then(() =>
            this.broker.emit(
              `tau.containers.addedToContainer.${ctx.params.container}`,
              ctx.params.entity
            )
          )
          .catch((err) =>
            this.logger.error(
              `could not add entity with id '${ctx.params.entity._id}' to container '${ctx.params.container}'`,
              err
            )
          );
      },
    },
  };
}
