# Class: Registry

[Services](../modules/tau_world.Services.md).[CommandSets](../modules/tau_world.Services.CommandSets.md).Registry

## Hierarchy

- `Service`

  ↳ **`Registry`**

## Table of contents

### Constructors

- [constructor](tau_world.Services.CommandSets.Registry.md#constructor)

### Properties

- [dependencies](tau_world.Services.CommandSets.Registry.md#dependencies)
- [name](tau_world.Services.CommandSets.Registry.md#name)

### Methods

- [getCommandSet](tau_world.Services.CommandSets.Registry.md#getcommandset)
- [started](tau_world.Services.CommandSets.Registry.md#started)

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

### dependencies

• `Readonly` **dependencies**: `string`[]

#### Overrides

Moleculer.Service.dependencies

#### Defined in

[world/src/services/CommandSets.ts:20](https://github.com/tau-mud/tau/blob/6645dc6/packages/world/src/services/CommandSets.ts#L20)

___

### name

• `Readonly` **name**: ``"tau.commandSets"``

#### Overrides

Moleculer.Service.name

#### Defined in

[world/src/services/CommandSets.ts:19](https://github.com/tau-mud/tau/blob/6645dc6/packages/world/src/services/CommandSets.ts#L19)

## Methods

### getCommandSet

▸ **getCommandSet**(`ctx`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | `Context`<[`IGetCommandSetParams`](../interfaces/tau_world.Services.CommandSets.IGetCommandSetParams.md), {}\> |

#### Returns

`any`

#### Defined in

[world/src/services/CommandSets.ts:42](https://github.com/tau-mud/tau/blob/6645dc6/packages/world/src/services/CommandSets.ts#L42)

___

### started

▸ `Private` **started**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

[world/src/services/CommandSets.ts:25](https://github.com/tau-mud/tau/blob/6645dc6/packages/world/src/services/CommandSets.ts#L25)
