import { Context, ServiceSchema } from "moleculer";

import { SystemService } from "./SystemService";

import { IEntity } from "../IEntity";

/**
 * A location entity defines the `location` attribute which should be the `_id` of the
 * {@link IContainer} that contains the Entity.
 **/
export interface ILocation extends IEntity {
  /**
   * The `_id` of the container which contains the entity.
   */
  location: string;
}

interface IMoveParams {
  entity: ILocation;
  /**
   * The location to move the entity to.
   **/
  to: string;
}

/**
 * Manages lcations of `Entities` within the game world. The `LocationSystem` must be paired with
 * the `ContainerSystem` which manages `Entities` that can containe other entities.
 *
 * ## Moleculer Dependencies
 * * `tau.containers` - depends on the {@link ContainerSystem} as entity locations may only
 *   reference containers.
 *
 * ## Moleculer Actions
 *
 * ### `tau.locations.move`
 * Moves the provided entity to the location specified by `to`. The target location must be a
 * ``
 * #### Params
 * * `entity`: _{@link ILocation}_ - the entity to move.
 * * `to`: _string_ - the `_id` of the container to move the entity to.
 *
 * #### Moleculer Events Triggered
 * ##### `tau.locations.entityMoved.<entityId>`
 * * `entity`: _{@link ILocation}_ - the entity that was moved.
 * * `from`: _string_ - the location the entity was moved from.
 * * `to`: _string_ - the container to which the entity was moved.
 **/
export function LocationSystem(): ServiceSchema {
  return {
    name: "tau.locations",
    mixins: [SystemService],
    filter: { location: { $exists: true } },
    dependencies: ["tau.containers"],
    methods: {
      beforeRegister(entity: ILocation) {
        return this.broker
          .call("tau.entities.find", { query: { _id: entity.location } })
          .then(([location]) => {
            if (!location) {
              throw new Error("the parent location was not found");
            } else if (!location.container) {
              throw new Error("the parent location was not a container");
            }
          });
      },
      afterRegister(entity: ILocation) {
        return this.broker.call("tau.containers.addToContainer", {
          container: entity.location,
          entity: entity,
        });
      },
    },
    actions: {
      move(ctx: Context<IMoveParams>) {
        const entity = ctx.params.entity;
        return this.updateEntity(ctx, {
          ...entity,
          location: ctx.params.to,
        }).then(() =>
          ctx.emit(`tau.locations.entityMoved.${entity._id}`, {
            entity,
            from: entity.location,
            to: ctx.params.to,
          })
        );
      },
    },
  };
}
