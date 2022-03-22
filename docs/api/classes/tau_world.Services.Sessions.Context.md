# Class: Context

[Services](../modules/tau_world.Services.md).[Sessions](../modules/tau_world.Services.Sessions.md).Context

## Table of contents

### Constructors

- [constructor](tau_world.Services.Sessions.Context.md#constructor)

### Properties

- [logger](tau_world.Services.Sessions.Context.md#logger)
- [session](tau_world.Services.Sessions.Context.md#session)
- [sessionID](tau_world.Services.Sessions.Context.md#sessionid)

### Methods

- [call](tau_world.Services.Sessions.Context.md#call)
- [getFromFlash](tau_world.Services.Sessions.Context.md#getfromflash)
- [getFromStore](tau_world.Services.Sessions.Context.md#getfromstore)
- [puts](tau_world.Services.Sessions.Context.md#puts)
- [render](tau_world.Services.Sessions.Context.md#render)
- [setController](tau_world.Services.Sessions.Context.md#setcontroller)
- [setInFlash](tau_world.Services.Sessions.Context.md#setinflash)
- [setInStore](tau_world.Services.Sessions.Context.md#setinstore)

## Constructors

### constructor

• **new Context**(`session`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `session` | `Service`<`ServiceSettingSchema`\> |

#### Defined in

[taumud/tau/packages/world/src/services/Sessions/Context.ts:12](https://github.com/tau-mud/tau/blob/0a6de30/packages/world/src/services/Sessions/Context.ts#L12)

## Properties

### logger

• `Readonly` **logger**: `LoggerInstance`

#### Defined in

[taumud/tau/packages/world/src/services/Sessions/Context.ts:10](https://github.com/tau-mud/tau/blob/0a6de30/packages/world/src/services/Sessions/Context.ts#L10)

___

### session

• `Private` `Readonly` **session**: `Service`<`ServiceSettingSchema`\>

#### Defined in

[taumud/tau/packages/world/src/services/Sessions/Context.ts:8](https://github.com/tau-mud/tau/blob/0a6de30/packages/world/src/services/Sessions/Context.ts#L8)

___

### sessionID

• `Readonly` **sessionID**: `string`

#### Defined in

[taumud/tau/packages/world/src/services/Sessions/Context.ts:9](https://github.com/tau-mud/tau/blob/0a6de30/packages/world/src/services/Sessions/Context.ts#L9)

## Methods

### call

▸ **call**(`endpoint`, `args`): `Promise`<`unknown`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `endpoint` | `string` |
| `args` | `GenericObject` |

#### Returns

`Promise`<`unknown`\>

#### Defined in

[taumud/tau/packages/world/src/services/Sessions/Context.ts:47](https://github.com/tau-mud/tau/blob/0a6de30/packages/world/src/services/Sessions/Context.ts#L47)

___

### getFromFlash

▸ **getFromFlash**(`key`, `defaultValue?`): `Promise`<`any`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `key` | `string` | `undefined` |
| `defaultValue` | `any` | `null` |

#### Returns

`Promise`<`any`\>

#### Defined in

[taumud/tau/packages/world/src/services/Sessions/Context.ts:30](https://github.com/tau-mud/tau/blob/0a6de30/packages/world/src/services/Sessions/Context.ts#L30)

___

### getFromStore

▸ **getFromStore**(`key`, `defaultValue?`): `Promise`<`any`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `key` | `string` | `undefined` |
| `defaultValue` | `any` | `null` |

#### Returns

`Promise`<`any`\>

#### Defined in

[taumud/tau/packages/world/src/services/Sessions/Context.ts:38](https://github.com/tau-mud/tau/blob/0a6de30/packages/world/src/services/Sessions/Context.ts#L38)

___

### puts

▸ **puts**(`message`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `string` |

#### Returns

`Promise`<`any`\>

#### Defined in

[taumud/tau/packages/world/src/services/Sessions/Context.ts:18](https://github.com/tau-mud/tau/blob/0a6de30/packages/world/src/services/Sessions/Context.ts#L18)

___

### render

▸ **render**(`template`, `context?`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `template` | `string` |
| `context` | [`IRenderContext`](../interfaces/tau_world.Services.Sessions.IRenderContext.md) |

#### Returns

`Promise`<`any`\>

#### Defined in

[taumud/tau/packages/world/src/services/Sessions/Context.ts:22](https://github.com/tau-mud/tau/blob/0a6de30/packages/world/src/services/Sessions/Context.ts#L22)

___

### setController

▸ **setController**(`controller`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `controller` | `string` |

#### Returns

`Promise`<`any`\>

#### Defined in

[taumud/tau/packages/world/src/services/Sessions/Context.ts:41](https://github.com/tau-mud/tau/blob/0a6de30/packages/world/src/services/Sessions/Context.ts#L41)

___

### setInFlash

▸ **setInFlash**(`key`, `value`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |
| `value` | `string` |

#### Returns

`Promise`<`any`\>

#### Defined in

[taumud/tau/packages/world/src/services/Sessions/Context.ts:26](https://github.com/tau-mud/tau/blob/0a6de30/packages/world/src/services/Sessions/Context.ts#L26)

___

### setInStore

▸ **setInStore**(`key`, `value`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |
| `value` | `string` |

#### Returns

`Promise`<`any`\>

#### Defined in

[taumud/tau/packages/world/src/services/Sessions/Context.ts:34](https://github.com/tau-mud/tau/blob/0a6de30/packages/world/src/services/Sessions/Context.ts#L34)
