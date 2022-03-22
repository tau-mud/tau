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

- [Promise](tau_world.Services.Sessions.Manager.md#promise)
- [actions](tau_world.Services.Sessions.Manager.md#actions)
- [broker](tau_world.Services.Sessions.Manager.md#broker)
- [dependencies](tau_world.Services.Sessions.Manager.md#dependencies)
- [fullName](tau_world.Services.Sessions.Manager.md#fullname)
- [logger](tau_world.Services.Sessions.Manager.md#logger)
- [metadata](tau_world.Services.Sessions.Manager.md#metadata)
- [name](tau_world.Services.Sessions.Manager.md#name)
- [originalSchema](tau_world.Services.Sessions.Manager.md#originalschema)
- [schema](tau_world.Services.Sessions.Manager.md#schema)
- [settings](tau_world.Services.Sessions.Manager.md#settings)
- [version](tau_world.Services.Sessions.Manager.md#version)

### Methods

- [\_init](tau_world.Services.Sessions.Manager.md#_init)
- [\_start](tau_world.Services.Sessions.Manager.md#_start)
- [\_stop](tau_world.Services.Sessions.Manager.md#_stop)
- [createSession](tau_world.Services.Sessions.Manager.md#createsession)
- [parseServiceSchema](tau_world.Services.Sessions.Manager.md#parseserviceschema)
- [started](tau_world.Services.Sessions.Manager.md#started)
- [tau.portal.connections.created](tau_world.Services.Sessions.Manager.md#tau.portal.connections.created)
- [waitForServices](tau_world.Services.Sessions.Manager.md#waitforservices)
- [applyMixins](tau_world.Services.Sessions.Manager.md#applymixins)
- [mergeSchemaActions](tau_world.Services.Sessions.Manager.md#mergeschemaactions)
- [mergeSchemaDependencies](tau_world.Services.Sessions.Manager.md#mergeschemadependencies)
- [mergeSchemaEvents](tau_world.Services.Sessions.Manager.md#mergeschemaevents)
- [mergeSchemaHooks](tau_world.Services.Sessions.Manager.md#mergeschemahooks)
- [mergeSchemaLifecycleHandlers](tau_world.Services.Sessions.Manager.md#mergeschemalifecyclehandlers)
- [mergeSchemaMetadata](tau_world.Services.Sessions.Manager.md#mergeschemametadata)
- [mergeSchemaMethods](tau_world.Services.Sessions.Manager.md#mergeschemamethods)
- [mergeSchemaMixins](tau_world.Services.Sessions.Manager.md#mergeschemamixins)
- [mergeSchemaSettings](tau_world.Services.Sessions.Manager.md#mergeschemasettings)
- [mergeSchemaUnknown](tau_world.Services.Sessions.Manager.md#mergeschemaunknown)
- [mergeSchemas](tau_world.Services.Sessions.Manager.md#mergeschemas)

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

[moleculer/index.d.ts:702](https://github.com/fugufish/moleculer/blob/9f6bc2b6/index.d.ts#L702)

## Properties

### Promise

• **Promise**: `PromiseConstructorLike`

#### Inherited from

Moleculer.Service.Promise

#### Defined in

[moleculer/index.d.ts:717](https://github.com/fugufish/moleculer/blob/9f6bc2b6/index.d.ts#L717)

___

### actions

• **actions**: `ServiceActions`

#### Inherited from

Moleculer.Service.actions

#### Defined in

[moleculer/index.d.ts:716](https://github.com/fugufish/moleculer/blob/9f6bc2b6/index.d.ts#L716)

___

### broker

• **broker**: `ServiceBroker`

#### Inherited from

Moleculer.Service.broker

#### Defined in

[moleculer/index.d.ts:714](https://github.com/fugufish/moleculer/blob/9f6bc2b6/index.d.ts#L714)

___

### dependencies

• `Readonly` **dependencies**: `string`[]

#### Overrides

Moleculer.Service.dependencies

#### Defined in

[taumud/tau/packages/world/src/services/Sessions/Manager.ts:18](https://github.com/tau-mud/tau/blob/b8e3567/packages/world/src/services/Sessions/Manager.ts#L18)

___

### fullName

• **fullName**: `string`

#### Inherited from

Moleculer.Service.fullName

#### Defined in

[moleculer/index.d.ts:707](https://github.com/fugufish/moleculer/blob/9f6bc2b6/index.d.ts#L707)

___

### logger

• **logger**: `LoggerInstance`

#### Inherited from

Moleculer.Service.logger

#### Defined in

[moleculer/index.d.ts:715](https://github.com/fugufish/moleculer/blob/9f6bc2b6/index.d.ts#L715)

___

### metadata

• **metadata**: `GenericObject`

#### Inherited from

Moleculer.Service.metadata

#### Defined in

[moleculer/index.d.ts:710](https://github.com/fugufish/moleculer/blob/9f6bc2b6/index.d.ts#L710)

___

### name

• `Readonly` **name**: ``"tau.sessions"``

#### Overrides

Moleculer.Service.name

#### Defined in

[taumud/tau/packages/world/src/services/Sessions/Manager.ts:19](https://github.com/tau-mud/tau/blob/b8e3567/packages/world/src/services/Sessions/Manager.ts#L19)

___

### originalSchema

• **originalSchema**: `ServiceSchema`<`ServiceSettingSchema`\>

#### Inherited from

Moleculer.Service.originalSchema

#### Defined in

[moleculer/index.d.ts:713](https://github.com/fugufish/moleculer/blob/9f6bc2b6/index.d.ts#L713)

___

### schema

• **schema**: `ServiceSchema`<`ServiceSettingSchema`\>

#### Inherited from

Moleculer.Service.schema

#### Defined in

[moleculer/index.d.ts:712](https://github.com/fugufish/moleculer/blob/9f6bc2b6/index.d.ts#L712)

___

### settings

• **settings**: `ServiceSettingSchema`

#### Inherited from

Moleculer.Service.settings

#### Defined in

[moleculer/index.d.ts:709](https://github.com/fugufish/moleculer/blob/9f6bc2b6/index.d.ts#L709)

___

### version

• `Optional` **version**: `string` \| `number`

#### Inherited from

Moleculer.Service.version

#### Defined in

[moleculer/index.d.ts:708](https://github.com/fugufish/moleculer/blob/9f6bc2b6/index.d.ts#L708)

## Methods

### \_init

▸ **_init**(): `void`

#### Returns

`void`

#### Inherited from

Moleculer.Service.\_init

#### Defined in

[moleculer/index.d.ts:720](https://github.com/fugufish/moleculer/blob/9f6bc2b6/index.d.ts#L720)

___

### \_start

▸ **_start**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Inherited from

Moleculer.Service.\_start

#### Defined in

[moleculer/index.d.ts:721](https://github.com/fugufish/moleculer/blob/9f6bc2b6/index.d.ts#L721)

___

### \_stop

▸ **_stop**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Inherited from

Moleculer.Service.\_stop

#### Defined in

[moleculer/index.d.ts:722](https://github.com/fugufish/moleculer/blob/9f6bc2b6/index.d.ts#L722)

___

### createSession

▸ `Private` **createSession**(`conn`): `Service`<`ServiceSettingSchema`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `conn` | `IConnectionSettings` |

#### Returns

`Service`<`ServiceSettingSchema`\>

#### Defined in

[taumud/tau/packages/world/src/services/Sessions/Manager.ts:46](https://github.com/tau-mud/tau/blob/b8e3567/packages/world/src/services/Sessions/Manager.ts#L46)

___

### parseServiceSchema

▸ `Protected` **parseServiceSchema**(`schema`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `schema` | `ServiceSchema`<`ServiceSettingSchema`\> |

#### Returns

`void`

#### Inherited from

Moleculer.Service.parseServiceSchema

#### Defined in

[moleculer/index.d.ts:704](https://github.com/fugufish/moleculer/blob/9f6bc2b6/index.d.ts#L704)

___

### started

▸ `Private` **started**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

[taumud/tau/packages/world/src/services/Sessions/Manager.ts:32](https://github.com/tau-mud/tau/blob/b8e3567/packages/world/src/services/Sessions/Manager.ts#L32)

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

[taumud/tau/packages/world/src/services/Sessions/Manager.ts:24](https://github.com/tau-mud/tau/blob/b8e3567/packages/world/src/services/Sessions/Manager.ts#L24)

___

### waitForServices

▸ **waitForServices**(`serviceNames`, `timeout?`, `interval?`, `logger?`): `Promise`<`WaitForServicesResult`\>

Wait for the specified services to become available/registered with this broker.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `serviceNames` | `string` \| `string`[] \| `ServiceDependency`[] | The service, or services, we are waiting for. |
| `timeout?` | `number` | The total time this call may take. If this time has passed and the service(s)           are not available an error will be thrown. (In milliseconds) |
| `interval?` | `number` | The time we will wait before once again checking if the service(s) are available (In milliseconds) |
| `logger?` | `LoggerInstance` | the broker logger instance |

#### Returns

`Promise`<`WaitForServicesResult`\>

#### Inherited from

Moleculer.Service.waitForServices

#### Defined in

[moleculer/index.d.ts:733](https://github.com/fugufish/moleculer/blob/9f6bc2b6/index.d.ts#L733)

___

### applyMixins

▸ `Static` **applyMixins**(`schema`): `ServiceSchema`<`ServiceSettingSchema`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `schema` | `ServiceSchema`<`ServiceSettingSchema`\> |

#### Returns

`ServiceSchema`<`ServiceSettingSchema`\>

#### Inherited from

Moleculer.Service.applyMixins

#### Defined in

[moleculer/index.d.ts:738](https://github.com/fugufish/moleculer/blob/9f6bc2b6/index.d.ts#L738)

___

### mergeSchemaActions

▸ `Static` **mergeSchemaActions**(`src`, `target`): `GenericObject`

#### Parameters

| Name | Type |
| :------ | :------ |
| `src` | `GenericObject` |
| `target` | `GenericObject` |

#### Returns

`GenericObject`

#### Inherited from

Moleculer.Service.mergeSchemaActions

#### Defined in

[moleculer/index.d.ts:745](https://github.com/fugufish/moleculer/blob/9f6bc2b6/index.d.ts#L745)

___

### mergeSchemaDependencies

▸ `Static` **mergeSchemaDependencies**(`src`, `target`): `GenericObject`

#### Parameters

| Name | Type |
| :------ | :------ |
| `src` | `GenericObject` |
| `target` | `GenericObject` |

#### Returns

`GenericObject`

#### Inherited from

Moleculer.Service.mergeSchemaDependencies

#### Defined in

[moleculer/index.d.ts:743](https://github.com/fugufish/moleculer/blob/9f6bc2b6/index.d.ts#L743)

___

### mergeSchemaEvents

▸ `Static` **mergeSchemaEvents**(`src`, `target`): `GenericObject`

#### Parameters

| Name | Type |
| :------ | :------ |
| `src` | `GenericObject` |
| `target` | `GenericObject` |

#### Returns

`GenericObject`

#### Inherited from

Moleculer.Service.mergeSchemaEvents

#### Defined in

[moleculer/index.d.ts:747](https://github.com/fugufish/moleculer/blob/9f6bc2b6/index.d.ts#L747)

___

### mergeSchemaHooks

▸ `Static` **mergeSchemaHooks**(`src`, `target`): `GenericObject`

#### Parameters

| Name | Type |
| :------ | :------ |
| `src` | `GenericObject` |
| `target` | `GenericObject` |

#### Returns

`GenericObject`

#### Inherited from

Moleculer.Service.mergeSchemaHooks

#### Defined in

[moleculer/index.d.ts:744](https://github.com/fugufish/moleculer/blob/9f6bc2b6/index.d.ts#L744)

___

### mergeSchemaLifecycleHandlers

▸ `Static` **mergeSchemaLifecycleHandlers**(`src`, `target`): `GenericObject`

#### Parameters

| Name | Type |
| :------ | :------ |
| `src` | `GenericObject` |
| `target` | `GenericObject` |

#### Returns

`GenericObject`

#### Inherited from

Moleculer.Service.mergeSchemaLifecycleHandlers

#### Defined in

[moleculer/index.d.ts:748](https://github.com/fugufish/moleculer/blob/9f6bc2b6/index.d.ts#L748)

___

### mergeSchemaMetadata

▸ `Static` **mergeSchemaMetadata**(`src`, `target`): `GenericObject`

#### Parameters

| Name | Type |
| :------ | :------ |
| `src` | `GenericObject` |
| `target` | `GenericObject` |

#### Returns

`GenericObject`

#### Inherited from

Moleculer.Service.mergeSchemaMetadata

#### Defined in

[moleculer/index.d.ts:741](https://github.com/fugufish/moleculer/blob/9f6bc2b6/index.d.ts#L741)

___

### mergeSchemaMethods

▸ `Static` **mergeSchemaMethods**(`src`, `target`): `GenericObject`

#### Parameters

| Name | Type |
| :------ | :------ |
| `src` | `GenericObject` |
| `target` | `GenericObject` |

#### Returns

`GenericObject`

#### Inherited from

Moleculer.Service.mergeSchemaMethods

#### Defined in

[moleculer/index.d.ts:746](https://github.com/fugufish/moleculer/blob/9f6bc2b6/index.d.ts#L746)

___

### mergeSchemaMixins

▸ `Static` **mergeSchemaMixins**(`src`, `target`): `GenericObject`

#### Parameters

| Name | Type |
| :------ | :------ |
| `src` | `GenericObject` |
| `target` | `GenericObject` |

#### Returns

`GenericObject`

#### Inherited from

Moleculer.Service.mergeSchemaMixins

#### Defined in

[moleculer/index.d.ts:742](https://github.com/fugufish/moleculer/blob/9f6bc2b6/index.d.ts#L742)

___

### mergeSchemaSettings

▸ `Static` **mergeSchemaSettings**(`src`, `target`): `GenericObject`

#### Parameters

| Name | Type |
| :------ | :------ |
| `src` | `GenericObject` |
| `target` | `GenericObject` |

#### Returns

`GenericObject`

#### Inherited from

Moleculer.Service.mergeSchemaSettings

#### Defined in

[moleculer/index.d.ts:740](https://github.com/fugufish/moleculer/blob/9f6bc2b6/index.d.ts#L740)

___

### mergeSchemaUnknown

▸ `Static` **mergeSchemaUnknown**(`src`, `target`): `GenericObject`

#### Parameters

| Name | Type |
| :------ | :------ |
| `src` | `GenericObject` |
| `target` | `GenericObject` |

#### Returns

`GenericObject`

#### Inherited from

Moleculer.Service.mergeSchemaUnknown

#### Defined in

[moleculer/index.d.ts:749](https://github.com/fugufish/moleculer/blob/9f6bc2b6/index.d.ts#L749)

___

### mergeSchemas

▸ `Static` **mergeSchemas**(`mixinSchema`, `svcSchema`): `ServiceSchema`<`ServiceSettingSchema`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `mixinSchema` | `ServiceSchema`<`ServiceSettingSchema`\> |
| `svcSchema` | `ServiceSchema`<`ServiceSettingSchema`\> |

#### Returns

`ServiceSchema`<`ServiceSettingSchema`\>

#### Inherited from

Moleculer.Service.mergeSchemas

#### Defined in

[moleculer/index.d.ts:739](https://github.com/fugufish/moleculer/blob/9f6bc2b6/index.d.ts#L739)
