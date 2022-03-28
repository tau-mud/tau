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

- [settings](tau_world.Services.Sessions.Instance.md#settings)

### Methods

- [destroySession](tau_world.Services.Sessions.Instance.md#destroysession)
- [getController](tau_world.Services.Sessions.Instance.md#getcontroller)
- [getFromFlash](tau_world.Services.Sessions.Instance.md#getfromflash)
- [getFromStore](tau_world.Services.Sessions.Instance.md#getfromstore)
- [handleInput](tau_world.Services.Sessions.Instance.md#handleinput)
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

[world/src/services/Sessions/Instance.ts:81](https://github.com/tau-mud/tau/blob/6645dc6/packages/world/src/services/Sessions/Instance.ts#L81)

## Properties

### settings

• `Readonly` **settings**: `IConnectionSettings`

#### Overrides

Moleculer.Service.settings

#### Defined in

[world/src/services/Sessions/Instance.ts:79](https://github.com/tau-mud/tau/blob/6645dc6/packages/world/src/services/Sessions/Instance.ts#L79)

## Methods

### destroySession

▸ **destroySession**(): `void`

Destroys the session.

**`actions`**

#### Returns

`void`

#### Defined in

[world/src/services/Sessions/Instance.ts:234](https://github.com/tau-mud/tau/blob/6645dc6/packages/world/src/services/Sessions/Instance.ts#L234)

___

### getController

▸ **getController**(): `Promise`<`Controller`\>

Returns the currently active controller. If no controller has been set for this
Session, then the `start` controller is returned.

**`actions`**

#### Returns

`Promise`<`Controller`\>

#### Defined in

[world/src/services/Sessions/Instance.ts:153](https://github.com/tau-mud/tau/blob/6645dc6/packages/world/src/services/Sessions/Instance.ts#L153)

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

[world/src/services/Sessions/Instance.ts:307](https://github.com/tau-mud/tau/blob/6645dc6/packages/world/src/services/Sessions/Instance.ts#L307)

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

[world/src/services/Sessions/Instance.ts:123](https://github.com/tau-mud/tau/blob/6645dc6/packages/world/src/services/Sessions/Instance.ts#L123)

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

[world/src/services/Sessions/Instance.ts:249](https://github.com/tau-mud/tau/blob/6645dc6/packages/world/src/services/Sessions/Instance.ts#L249)

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

[world/src/services/Sessions/Instance.ts:143](https://github.com/tau-mud/tau/blob/6645dc6/packages/world/src/services/Sessions/Instance.ts#L143)

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

[world/src/services/Sessions/Instance.ts:135](https://github.com/tau-mud/tau/blob/6645dc6/packages/world/src/services/Sessions/Instance.ts#L135)

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

[world/src/services/Sessions/Instance.ts:272](https://github.com/tau-mud/tau/blob/6645dc6/packages/world/src/services/Sessions/Instance.ts#L272)

___

### resetFlash

▸ **resetFlash**(): `Promise`<`any`\>

#### Returns

`Promise`<`any`\>

#### Defined in

[world/src/services/Sessions/Instance.ts:316](https://github.com/tau-mud/tau/blob/6645dc6/packages/world/src/services/Sessions/Instance.ts#L316)

___

### resumeCurrentController

▸ **resumeCurrentController**(): `void`

Resumes the currently set controller.

**`actions`**

#### Returns

`void`

#### Defined in

[world/src/services/Sessions/Instance.ts:194](https://github.com/tau-mud/tau/blob/6645dc6/packages/world/src/services/Sessions/Instance.ts#L194)

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

[world/src/services/Sessions/Instance.ts:210](https://github.com/tau-mud/tau/blob/6645dc6/packages/world/src/services/Sessions/Instance.ts#L210)

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

[world/src/services/Sessions/Instance.ts:313](https://github.com/tau-mud/tau/blob/6645dc6/packages/world/src/services/Sessions/Instance.ts#L313)

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

[world/src/services/Sessions/Instance.ts:109](https://github.com/tau-mud/tau/blob/6645dc6/packages/world/src/services/Sessions/Instance.ts#L109)

___

### startCurrentController

▸ **startCurrentController**(): `void`

Starts the currently set controller

**`actions`**

#### Returns

`void`

#### Defined in

[world/src/services/Sessions/Instance.ts:174](https://github.com/tau-mud/tau/blob/6645dc6/packages/world/src/services/Sessions/Instance.ts#L174)

___

### started

▸ `Private` **started**(): `Promise`<`never`\>

#### Returns

`Promise`<`never`\>

#### Defined in

[world/src/services/Sessions/Instance.ts:91](https://github.com/tau-mud/tau/blob/6645dc6/packages/world/src/services/Sessions/Instance.ts#L91)

___

### tau.portal.started

▸ **tau.portal.started**(): `void`

#### Returns

`void`

#### Defined in

[world/src/services/Sessions/Instance.ts:302](https://github.com/tau-mud/tau/blob/6645dc6/packages/world/src/services/Sessions/Instance.ts#L302)
