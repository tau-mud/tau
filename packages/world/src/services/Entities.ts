import Moleculer from "moleculer";
import { createClient } from "redis";
import { v4 as uuidv4 } from "uuid";
import { Action } from "typed-moleculer";
import { keys } from "lodash";
import { IEntity } from "../IEntity";

export class EntityNotFoundError extends Error {
  constructor(_id: string) {
    super(`Entity with id ${_id} not found`);
  }
}

const DIFF_ADDED = "__added__";
const DIFF_REMOVED = "__removed__";

function difference(oldEntity: IEntity, newEntity: IEntity) {
  const oldKeys = Object.keys(oldEntity);
  const newKeys = Object.keys(newEntity);
  const difference = {};

  oldKeys.forEach((key) => {
    if (newEntity[key] && newEntity[key] !== oldEntity[key]) {
      difference[key] = newEntity[key];
    } else if (!newEntity[key]) {
      difference[key] = DIFF_REMOVED;
    }
  });

  newKeys.forEach((key) => {
    if (!oldEntity[key]) {
      difference[key] = DIFF_ADDED;
    }
  });

  return difference;
}

export interface IAttributeEvent {
  key: string;
  value: any;
  entity: IEntity;
}

export interface IAttributeAddedEvent extends IAttributeEvent {}

export interface IAttributeRemovedEvent extends IAttributeEvent {}

export interface IAttributeUpdatedEvent extends IAttributeEvent {
  oldEntity: IEntity;
  oldValue: any;
}

/**
 * Manages entities within the game world. This service will wait for all of the configured
 * sources to start before it will start.
 *
 * ## Moleculer Service Name
 * `tau.entities`
 *
 * ## Moleculer Mixins
 * * [DbService](https://github.com/moleculerjs/moleculer-db/tree/master/packages/moleculer-db)
 *
 * ## Moleculer Dependencies
 * * `tau.config`
 * * _All configured datasSources_
 */
export class Registry extends Moleculer.Service {
  readonly name = "tau.entities";
  attributes: Array<string> = [];

  /**
   * @private
   **/
  created() {
    this.loadDataSources = [];
    this.client = createClient(this.settings.redis);
  }

  /**
   * @private
   **/
  started() {
    return this.broker.waitForServices(this.loadDataSources).then(() => this.client.connect());
  }

  @Action()
  create(ctx: Moleculer.Context<IEntity>) {
    const entity = ctx.params;

    if (!entity._id) {
      entity._id = uuidv4();
    }

    return this.client.json
      .set(`entities:${entity._id}`, "$", entity)
      .then(() => this.broker.emit(`tau.entities.created`, entity))
      .then(() => keys(entity))
      .then((keys: Array<string>) =>
        keys.forEach((key) =>
          this.broker.emit(`tau.attributes.${key}.added`, {
            key: key,
            value: entity[key],
            entity: entity,
          })
        )
      );
  }

  @Action()
  fetch(ctx: Moleculer.Context<IEntity>) {
    const { _id } = ctx.params;

    return this.client.json.get(`entities:${_id}`).then((entity: IEntity) => {
      if (!entity) {
        throw new EntityNotFoundError(_id);
      }

      return entity;
    });
  }

  @Action()
  async update(ctx: IEntity) {
    let oldEntity: IEntity;
    return this.actions
      .fetch(ctx.params)
      .then((old: IEntity) => {
        oldEntity = old;
        return difference(oldEntity, ctx.params);
      })
      .then((diff) => {
        return this.client.json.set(`entities:${ctx._id}`, "$", ctx.params).then(() => {
          this.broker.emit(`tau.entities.updated`, ctx.params);

          Object.keys(diff).forEach((key) => {
            if (diff[key] === DIFF_ADDED) {
              this.broker.emit(`tau.attributes.${key}.added`, {
                key: key,
                value: ctx.params[key],
                entity: ctx.params,
              });
            } else if (diff[key] === DIFF_REMOVED) {
              this.broker.emit(`tau.attributes.${key}.removed`, {
                key: key,
                value: oldEntity[key],
                entity: ctx.params,
              });
            } else {
              this.broker.emit(`tau.attributes.${key}.updated`, {
                key: key,
                oldValue: oldEntity[key],
                value: ctx.params[key],
                entity: ctx.params,
                oldEntity: oldEntity,
              });
            }
          });
        });
      });
  }

  /**
   * @private
   **/
}
