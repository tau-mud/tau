# Class: Registry

[Services](../modules/tau_world.Services.md).[Entities](../modules/tau_world.Services.Entities.md).Registry

Manages entities within the game world. This service will wait for all of the configured
sources to start before it will start.

## Moleculer Service Name
`tau.entities`

## Moleculer Mixins
* [DbService](https://github.com/moleculerjs/moleculer-db/tree/master/packages/moleculer-db)

## Moleculer Dependencies
* _All configured datasSources_

## Hierarchy

- `Service`

  ↳ **`Registry`**

## Table of contents

### Constructors

- [constructor](tau_world.Services.Entities.Registry.md#constructor)

### Properties

- [mixins](tau_world.Services.Entities.Registry.md#mixins)
- [name](tau_world.Services.Entities.Registry.md#name)

### Methods

- [created](tau_world.Services.Entities.Registry.md#created)
- [entityCreated](tau_world.Services.Entities.Registry.md#entitycreated)
- [entityRemoved](tau_world.Services.Entities.Registry.md#entityremoved)
- [entityUpdated](tau_world.Services.Entities.Registry.md#entityupdated)
- [started](tau_world.Services.Entities.Registry.md#started)

## Constructors

### constructor

• **new Registry**(`broker`, `schema?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `broker` | `ServiceBroker` |
| `schema?` | `ServiceSchema`<`ServiceSettingSchema`\> |

#### Inherited from

Moleculer.Service.constructor

#### Defined in

world/node_modules/moleculer/index.d.ts:701

## Properties

### mixins

• `Readonly` **mixins**: `__module`[]

#### Defined in

[world/src/services/Entities.ts:20](https://github.com/tau-mud/tau/blob/6645dc6/packages/world/src/services/Entities.ts#L20)

___

### name

• `Readonly` **name**: ``"tau.entities"``

#### Overrides

Moleculer.Service.name

#### Defined in

[world/src/services/Entities.ts:19](https://github.com/tau-mud/tau/blob/6645dc6/packages/world/src/services/Entities.ts#L19)

## Methods

### created

▸ `Private` **created**(): `void`

#### Returns

`void`

#### Defined in

[world/src/services/Entities.ts:25](https://github.com/tau-mud/tau/blob/6645dc6/packages/world/src/services/Entities.ts#L25)

___

### entityCreated

▸ `Private` **entityCreated**(`entity`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | [`IEntity`](../interfaces/tau_world.IEntity.md) |

#### Returns

`void`

#### Defined in

[world/src/services/Entities.ts:39](https://github.com/tau-mud/tau/blob/6645dc6/packages/world/src/services/Entities.ts#L39)

___

### entityRemoved

▸ `Private` **entityRemoved**(`entity`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | [`IEntity`](../interfaces/tau_world.IEntity.md) |

#### Returns

`void`

#### Defined in

[world/src/services/Entities.ts:53](https://github.com/tau-mud/tau/blob/6645dc6/packages/world/src/services/Entities.ts#L53)

___

### entityUpdated

▸ `Private` **entityUpdated**(`entity`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | [`IEntity`](../interfaces/tau_world.IEntity.md) |

#### Returns

`void`

#### Defined in

[world/src/services/Entities.ts:46](https://github.com/tau-mud/tau/blob/6645dc6/packages/world/src/services/Entities.ts#L46)

___

### started

▸ `Private` **started**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

[world/src/services/Entities.ts:32](https://github.com/tau-mud/tau/blob/6645dc6/packages/world/src/services/Entities.ts#L32)
