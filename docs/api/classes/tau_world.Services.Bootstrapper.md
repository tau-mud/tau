# Class: Bootstrapper

[@tau/world](../modules/tau_world.md).[Services](../modules/tau_world.Services.md).Bootstrapper

## Hierarchy

- `Service`

  ↳ **`Bootstrapper`**

## Table of contents

### Constructors

- [constructor](tau_world.Services.Bootstrapper.md#constructor)

### Properties

- [dependencies](tau_world.Services.Bootstrapper.md#dependencies)
- [name](tau_world.Services.Bootstrapper.md#name)

### Methods

- [loadDataSource](tau_world.Services.Bootstrapper.md#loaddatasource)
- [started](tau_world.Services.Bootstrapper.md#started)

## Constructors

### constructor

• **new Bootstrapper**(`broker`, `schema?`)

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

### dependencies

• `Readonly` **dependencies**: `string`[]

#### Overrides

Moleculer.Service.dependencies

#### Defined in

[world/src/services/Bootstrapper.ts:12](https://github.com/tau-mud/tau/blob/6645dc6/packages/world/src/services/Bootstrapper.ts#L12)

___

### name

• `Readonly` **name**: ``"tau.bootstrap"``

#### Overrides

Moleculer.Service.name

#### Defined in

[world/src/services/Bootstrapper.ts:11](https://github.com/tau-mud/tau/blob/6645dc6/packages/world/src/services/Bootstrapper.ts#L11)

## Methods

### loadDataSource

▸ `Private` **loadDataSource**(`source`): `Promise`<`unknown`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `source` | `ServiceSchema`<`ServiceSettingSchema`\> |

#### Returns

`Promise`<`unknown`[]\>

#### Defined in

[world/src/services/Bootstrapper.ts:43](https://github.com/tau-mud/tau/blob/6645dc6/packages/world/src/services/Bootstrapper.ts#L43)

___

### started

▸ `Private` **started**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

[world/src/services/Bootstrapper.ts:17](https://github.com/tau-mud/tau/blob/6645dc6/packages/world/src/services/Bootstrapper.ts#L17)
