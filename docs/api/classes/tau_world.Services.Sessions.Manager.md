# Class: Manager

[Services](../modules/tau_world.Services.md).[Sessions](../modules/tau_world.Services.Sessions.md).Manager

Provides session management capabilties. This service is responsible for creating and destroying
game sessions.

## Moleculer Service Name
`tau.sessions`

## Moleculer Dependencies
* {@link @tau/portal.Portal.Service}

## Hierarchy

- `Service`

  ↳ **`Manager`**

## Table of contents

### Constructors

- [constructor](tau_world.Services.Sessions.Manager.md#constructor)

### Properties

- [dependencies](tau_world.Services.Sessions.Manager.md#dependencies)
- [name](tau_world.Services.Sessions.Manager.md#name)

### Methods

- [createSession](tau_world.Services.Sessions.Manager.md#createsession)
- [started](tau_world.Services.Sessions.Manager.md#started)
- [tau.portal.connections.created](tau_world.Services.Sessions.Manager.md#tau.portal.connections.created)

## Constructors

### constructor

• **new Manager**(`broker`, `schema?`)

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

[world/src/services/Sessions/Manager.ts:18](https://github.com/tau-mud/tau/blob/6645dc6/packages/world/src/services/Sessions/Manager.ts#L18)

___

### name

• `Readonly` **name**: ``"tau.sessions"``

#### Overrides

Moleculer.Service.name

#### Defined in

[world/src/services/Sessions/Manager.ts:19](https://github.com/tau-mud/tau/blob/6645dc6/packages/world/src/services/Sessions/Manager.ts#L19)

## Methods

### createSession

▸ `Private` **createSession**(`conn`): `Service`<`ServiceSettingSchema`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `conn` | `IConnectionSettings` |

#### Returns

`Service`<`ServiceSettingSchema`\>

#### Defined in

[world/src/services/Sessions/Manager.ts:46](https://github.com/tau-mud/tau/blob/6645dc6/packages/world/src/services/Sessions/Manager.ts#L46)

___

### started

▸ `Private` **started**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

[world/src/services/Sessions/Manager.ts:32](https://github.com/tau-mud/tau/blob/6645dc6/packages/world/src/services/Sessions/Manager.ts#L32)

___

### tau.portal.connections.created

▸ `Private` **tau.portal.connections.created**(`ctx`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | `Context`<`IConnectionSettings`, {}\> |

#### Returns

`void`

#### Defined in

[world/src/services/Sessions/Manager.ts:24](https://github.com/tau-mud/tau/blob/6645dc6/packages/world/src/services/Sessions/Manager.ts#L24)
