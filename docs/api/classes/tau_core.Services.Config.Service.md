# Class: Service

[Services](../modules/tau_core.Services.md).[Config](../modules/tau_core.Services.Config.md).Service

This service provides access to the game configuration data, and is run by all game processes.
Other services may access Tau specific configuration using this service.

### Moleculer Service Name
 `tau.config`

## Hierarchy

- `Service`

  ↳ **`Service`**

## Table of contents

### Constructors

- [constructor](tau_core.Services.Config.Service.md#constructor)

### Properties

- [name](tau_core.Services.Config.Service.md#name)

### Methods

- [getValue](tau_core.Services.Config.Service.md#getvalue)

## Constructors

### constructor

• **new Service**(`broker`, `schema?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `broker` | `ServiceBroker` |
| `schema?` | `ServiceSchema`<`ServiceSettingSchema`\> |

#### Inherited from

Moleculer.Service.constructor

#### Defined in

core/node_modules/moleculer/index.d.ts:702

## Properties

### name

• **name**: `string` = `"tau.config"`

#### Overrides

Moleculer.Service.name

#### Defined in

[core/src/services/Config.ts:29](https://github.com/tau-mud/tau/blob/6645dc6/packages/core/src/services/Config.ts#L29)

## Methods

### getValue

▸ **getValue**(`ctx`): `Promise`<`any`\>

Get a value from the configuration using the provided key. Key can be a dot separated path.

### Moleculer Action
`tau.config.getValue`

#### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | `Context`<[`IGetValueParams`](../interfaces/tau_core.Services.Config.IGetValueParams.md), {}\> |

#### Returns

`Promise`<`any`\>

#### Defined in

[core/src/services/Config.ts:37](https://github.com/tau-mud/tau/blob/6645dc6/packages/core/src/services/Config.ts#L37)
