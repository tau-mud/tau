import { Context } from "moleculer";
import { includes } from "lodash";
import { Action } from "typed-moleculer";

import { System as Base } from "../System";
import { IAttributeAddedEvent, IAttributeUpdatedEvent } from "../services/Entities";
import { IEntity } from "../IEntity";

class EntityAlreadyInContainerError extends Error {
  constructor(entity: IEntity, container: IEntity) {
    super(`Entity ${entity.id} is already in container ${container.id}`);
  }
}

class InvalidContainerError extends Error {
  constructor(entity: IEntity) {
    super(`Invalid entity: ${JSON.stringify(entity)}, missing container attribute`);
  }
}

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

export interface IContainer extends IEntity {
  /**
   * The `_id` of the container which contains the entity.
   */
  container: Array<string>;
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
 * ### Moleculer Dependencies
 * * `tau.containers` - depends on the {@link ContainerSystem} as entity locations may only
 *   reference containers.
 *
 * ### Moleculer Actions
 *
 * #### `tau.locations.move`
 * Moves the provided entity to the location specified by `to`. The target location must be a
 * ##### Params
 * * `entity`: _{@link ILocation}_ - the entity to move.
 * * `to`: _string_ - the `_id` of the container to move the entity to.
 *
 * ##### Moleculer Events Triggered
 * ###### `tau.locations.entityMoved.<entityId>`
 * * `entity`: _{@link ILocation}_ - the entity that was moved.
 * * `from`: _string_ - the location the entity was moved from.
 * * `to`: _string_ - the container to which the entity was moved.
 */
export class System extends Base {
  readonly name = "tau.locations";
  readonly attributes = ["location", "container"];

  @Action()
  mine(ctx: Context<ILocation>) {
    ctx.call("tau.entities.fetch", { _id: ctx.params.location });
  }

  locationAdded(ctx: Context<IAttributeAddedEvent>) {
    const entity = ctx.params.entity as ILocation;

    ctx
      .call("tau.entities.fetch", { _id: entity.location })
      .then((container: IContainer) => {
        if (!container.container) {
          throw new InvalidContainerError(container);
        } else if (includes(container.container, entity._id)) {
          throw new EntityAlreadyInContainerError(entity, container);
        }

        return container;
      })
      .then((container) => {
        ctx.call("tau.entities.update", {
          ...container,
          container: [...container.container, entity._id],
        });
      });
  }

  containerUpdated(ctx: Context<IAttributeUpdatedEvent>) {
    console.log("container updated", ctx.params);
  }
}
