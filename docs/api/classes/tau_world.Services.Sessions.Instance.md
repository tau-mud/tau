# Class: Instance

[Services](../modules/tau_world.Services.md).[Sessions](../modules/tau_world.Services.Sessions.md).Instance

A session instance represents an indvidual connection from the portal to the world.
`SessionInstanceServices` are created dynamically when a connection notifies the
{@link SessionService} that a new connection has beenc reated.

## Moleculer Service Name
`tau.world.sessions.<sessionUuid>`

## Moleculer Dependencies
{@link @tau/portal.services.Connection}

## Hierarchy

- `Service`

  ↳ **`Instance`**

## Table of contents

### Constructors

- [constructor](tau_world.Services.Sessions.Instance.md#constructor)

### Properties

- [Promise](tau_world.Services.Sessions.Instance.md#promise)
- [actions](tau_world.Services.Sessions.Instance.md#actions)
- [broker](tau_world.Services.Sessions.Instance.md#broker)
- [dependencies](tau_world.Services.Sessions.Instance.md#dependencies)
- [fullName](tau_world.Services.Sessions.Instance.md#fullname)
- [logger](tau_world.Services.Sessions.Instance.md#logger)
- [metadata](tau_world.Services.Sessions.Instance.md#metadata)
- [name](tau_world.Services.Sessions.Instance.md#name)
- [originalSchema](tau_world.Services.Sessions.Instance.md#originalschema)
- [schema](tau_world.Services.Sessions.Instance.md#schema)
- [settings](tau_world.Services.Sessions.Instance.md#settings)
- [version](tau_world.Services.Sessions.Instance.md#version)

### Methods

- [\_init](tau_world.Services.Sessions.Instance.md#_init)
- [\_start](tau_world.Services.Sessions.Instance.md#_start)
- [\_stop](tau_world.Services.Sessions.Instance.md#_stop)
- [destroySession](tau_world.Services.Sessions.Instance.md#destroysession)
- [getController](tau_world.Services.Sessions.Instance.md#getcontroller)
- [getFromFlash](tau_world.Services.Sessions.Instance.md#getfromflash)
- [getFromStore](tau_world.Services.Sessions.Instance.md#getfromstore)
- [handleInput](tau_world.Services.Sessions.Instance.md#handleinput)
- [parseServiceSchema](tau_world.Services.Sessions.Instance.md#parseserviceschema)
- [print](tau_world.Services.Sessions.Instance.md#print)
- [puts](tau_world.Services.Sessions.Instance.md#puts)
- [renderTemplate](tau_world.Services.Sessions.Instance.md#rendertemplate)
- [resetFlash](tau_world.Services.Sessions.Instance.md#resetflash)
- [resumeCurrentController](tau_world.Services.Sessions.Instance.md#resumecurrentcontroller)
- [setController](tau_world.Services.Sessions.Instance.md#setcontroller)
- [setInFlash](tau_world.Services.Sessions.Instance.md#setinflash)
- [setInStore](tau_world.Services.Sessions.Instance.md#setinstore)
- [startCurrentController](tau_world.Services.Sessions.Instance.md#startcurrentcontroller)
- [started](tau_world.Services.Sessions.Instance.md#started)
- [tau.portal.started](tau_world.Services.Sessions.Instance.md#tau.portal.started)
- [waitForServices](tau_world.Services.Sessions.Instance.md#waitforservices)
- [applyMixins](tau_world.Services.Sessions.Instance.md#applymixins)
- [mergeSchemaActions](tau_world.Services.Sessions.Instance.md#mergeschemaactions)
- [mergeSchemaDependencies](tau_world.Services.Sessions.Instance.md#mergeschemadependencies)
- [mergeSchemaEvents](tau_world.Services.Sessions.Instance.md#mergeschemaevents)
- [mergeSchemaHooks](tau_world.Services.Sessions.Instance.md#mergeschemahooks)
- [mergeSchemaLifecycleHandlers](tau_world.Services.Sessions.Instance.md#mergeschemalifecyclehandlers)
- [mergeSchemaMetadata](tau_world.Services.Sessions.Instance.md#mergeschemametadata)
- [mergeSchemaMethods](tau_world.Services.Sessions.Instance.md#mergeschemamethods)
- [mergeSchemaMixins](tau_world.Services.Sessions.Instance.md#mergeschemamixins)
- [mergeSchemaSettings](tau_world.Services.Sessions.Instance.md#mergeschemasettings)
- [mergeSchemaUnknown](tau_world.Services.Sessions.Instance.md#mergeschemaunknown)
- [mergeSchemas](tau_world.Services.Sessions.Instance.md#mergeschemas)

## Constructors

### constructor

• **new Instance**(`broker`, `params`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `broker` | `ServiceBroker` |
| `params` | `IConnectionSettings` |

#### Overrides

Moleculer.Service.constructor

#### Defined in

[taumud/tau/packages/world/src/services/Sessions/Instance.ts:81](https://github.com/tau-mud/tau/blob/b8e3567/packages/world/src/services/Sessions/Instance.ts#L81)

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

• **dependencies**: `string` \| `ServiceDependency` \| (`string` \| `ServiceDependency`)[]

#### Inherited from

Moleculer.Service.dependencies

#### Defined in

[moleculer/index.d.ts:711](https://github.com/fugufish/moleculer/blob/9f6bc2b6/index.d.ts#L711)

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

• **name**: `string`

#### Inherited from

Moleculer.Service.name

#### Defined in

[moleculer/index.d.ts:706](https://github.com/fugufish/moleculer/blob/9f6bc2b6/index.d.ts#L706)

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

• `Readonly` **settings**: `IConnectionSettings`

#### Overrides

Moleculer.Service.settings

#### Defined in

[taumud/tau/packages/world/src/services/Sessions/Instance.ts:79](https://github.com/tau-mud/tau/blob/b8e3567/packages/world/src/services/Sessions/Instance.ts#L79)

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

### destroySession

▸ **destroySession**(): `void`

Destroys the session.

**`actions`**

#### Returns

`void`

#### Defined in

[taumud/tau/packages/world/src/services/Sessions/Instance.ts:234](https://github.com/tau-mud/tau/blob/b8e3567/packages/world/src/services/Sessions/Instance.ts#L234)

___

### getController

▸ **getController**(): `Promise`<`Controller`\>

Returns the currently active controller. If no controller has been set for this
Session, then the `start` controller is returned.

**`actions`**

#### Returns

`Promise`<`Controller`\>

#### Defined in

[taumud/tau/packages/world/src/services/Sessions/Instance.ts:153](https://github.com/tau-mud/tau/blob/b8e3567/packages/world/src/services/Sessions/Instance.ts#L153)

___

### getFromFlash

▸ **getFromFlash**(`key`, `defaultValue`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |
| `defaultValue` | `any` |

#### Returns

`Promise`<`any`\>

#### Defined in

[taumud/tau/packages/world/src/services/Sessions/Instance.ts:307](https://github.com/tau-mud/tau/blob/b8e3567/packages/world/src/services/Sessions/Instance.ts#L307)

___

### getFromStore

▸ **getFromStore**(`ctx`): `Promise`<`unknown`\>

Gets a value from the connection store. May return a default if the value was
not found.

**`actions`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | `Context`<[`IGetFromStoreParams`](../interfaces/tau_world.Services.Sessions.IGetFromStoreParams.md), {}\> |

#### Returns

`Promise`<`unknown`\>

#### Defined in

[taumud/tau/packages/world/src/services/Sessions/Instance.ts:123](https://github.com/tau-mud/tau/blob/b8e3567/packages/world/src/services/Sessions/Instance.ts#L123)

___

### handleInput

▸ **handleInput**(`ctx`): `Promise`<`any`\>

Handles incomming messages from the `Connection` and forwards it to the controller.

**`actions`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | `Context`<`IMessageContext`, {}\> |

#### Returns

`Promise`<`any`\>

#### Defined in

[taumud/tau/packages/world/src/services/Sessions/Instance.ts:249](https://github.com/tau-mud/tau/blob/b8e3567/packages/world/src/services/Sessions/Instance.ts#L249)

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

### print

▸ **print**(`ctx`): `void`

Print prints the cotnent to the connection. It does not add a newline on its own.

#### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | `Context`<`IPutsParams`, {}\> |

#### Returns

`void`

#### Defined in

[taumud/tau/packages/world/src/services/Sessions/Instance.ts:143](https://github.com/tau-mud/tau/blob/b8e3567/packages/world/src/services/Sessions/Instance.ts#L143)

___

### puts

▸ **puts**(`ctx`): `void`

Puts the provided message to the connection screen.

**`actions`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | `Context`<`IPutsParams`, {}\> |

#### Returns

`void`

#### Defined in

[taumud/tau/packages/world/src/services/Sessions/Instance.ts:135](https://github.com/tau-mud/tau/blob/b8e3567/packages/world/src/services/Sessions/Instance.ts#L135)

___

### renderTemplate

▸ **renderTemplate**(`ctx`): `Promise`<`never`\>

Renders the react element to the player `Connection`.

**`actions`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | `Context`<[`IRenderParams`](../interfaces/tau_world.Services.Sessions.IRenderParams.md), {}\> |

#### Returns

`Promise`<`never`\>

#### Defined in

[taumud/tau/packages/world/src/services/Sessions/Instance.ts:272](https://github.com/tau-mud/tau/blob/b8e3567/packages/world/src/services/Sessions/Instance.ts#L272)

___

### resetFlash

▸ **resetFlash**(): `Promise`<`any`\>

#### Returns

`Promise`<`any`\>

#### Defined in

[taumud/tau/packages/world/src/services/Sessions/Instance.ts:316](https://github.com/tau-mud/tau/blob/b8e3567/packages/world/src/services/Sessions/Instance.ts#L316)

___

### resumeCurrentController

▸ **resumeCurrentController**(): `void`

Resumes the currently set controller.

**`actions`**

#### Returns

`void`

#### Defined in

[taumud/tau/packages/world/src/services/Sessions/Instance.ts:194](https://github.com/tau-mud/tau/blob/b8e3567/packages/world/src/services/Sessions/Instance.ts#L194)

___

### setController

▸ **setController**(`ctx`): `Promise`<`never`\>

Sets the controller. If the controller being set is the current controller, then the
controller's resume function is called, otherwise the controller's start function
is called

**`actions`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | `Context`<[`ISetControllerParams`](../interfaces/tau_world.Services.Sessions.ISetControllerParams.md), {}\> |

#### Returns

`Promise`<`never`\>

#### Defined in

[taumud/tau/packages/world/src/services/Sessions/Instance.ts:210](https://github.com/tau-mud/tau/blob/b8e3567/packages/world/src/services/Sessions/Instance.ts#L210)

___

### setInFlash

▸ **setInFlash**(`key`, `value`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |
| `value` | `any` |

#### Returns

`Promise`<`any`\>

#### Defined in

[taumud/tau/packages/world/src/services/Sessions/Instance.ts:313](https://github.com/tau-mud/tau/blob/b8e3567/packages/world/src/services/Sessions/Instance.ts#L313)

___

### setInStore

▸ **setInStore**(`ctx`): `Promise`<`unknown`\>

Sets a value in the connection store.

**`action`** `tau.world.sessions.<sessionUuid>.setInStore`

#### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | `Context`<[`ISetInStoreParams`](../interfaces/tau_world.Services.Sessions.ISetInStoreParams.md), {}\> |

#### Returns

`Promise`<`unknown`\>

#### Defined in

[taumud/tau/packages/world/src/services/Sessions/Instance.ts:109](https://github.com/tau-mud/tau/blob/b8e3567/packages/world/src/services/Sessions/Instance.ts#L109)

___

### startCurrentController

▸ **startCurrentController**(): `void`

Starts the currently set controller

**`actions`**

#### Returns

`void`

#### Defined in

[taumud/tau/packages/world/src/services/Sessions/Instance.ts:174](https://github.com/tau-mud/tau/blob/b8e3567/packages/world/src/services/Sessions/Instance.ts#L174)

___

### started

▸ `Private` **started**(): `Promise`<`never`\>

#### Returns

`Promise`<`never`\>

#### Defined in

[taumud/tau/packages/world/src/services/Sessions/Instance.ts:91](https://github.com/tau-mud/tau/blob/b8e3567/packages/world/src/services/Sessions/Instance.ts#L91)

___

### tau.portal.started

▸ **tau.portal.started**(): `void`

#### Returns

`void`

#### Defined in

[taumud/tau/packages/world/src/services/Sessions/Instance.ts:302](https://github.com/tau-mud/tau/blob/b8e3567/packages/world/src/services/Sessions/Instance.ts#L302)

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
