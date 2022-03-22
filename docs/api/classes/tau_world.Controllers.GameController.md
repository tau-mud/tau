# Class: GameController

[@tau/world](../modules/tau_world.md).[Controllers](../modules/tau_world.Controllers.md).GameController

This is the primary game controller. It take incoming input and passes it to the command
handler.

## Hierarchy

- `Controller`

  ↳ **`GameController`**

## Table of contents

### Constructors

- [constructor](tau_world.Controllers.GameController.md#constructor)

### Properties

- [name](tau_world.Controllers.GameController.md#name)

### Methods

- [handleInput](tau_world.Controllers.GameController.md#handleinput)
- [resume](tau_world.Controllers.GameController.md#resume)
- [start](tau_world.Controllers.GameController.md#start)

## Constructors

### constructor

• **new GameController**()

#### Inherited from

Controller.constructor

## Properties

### name

• **name**: ``"game"``

#### Overrides

Controller.name

#### Defined in

[taumud/tau/packages/world/src/controllers/GameController.ts:11](https://github.com/tau-mud/tau/blob/9ec4b58/packages/world/src/controllers/GameController.ts#L11)

## Methods

### handleInput

▸ `Private` **handleInput**(`context`, `input`): `Promise`<`unknown`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `context` | [`Context`](tau_world.Services.Sessions.Context.md) |
| `input` | `IMessageContext` |

#### Returns

`Promise`<`unknown`\>

#### Overrides

Controller.handleInput

#### Defined in

[taumud/tau/packages/world/src/controllers/GameController.ts:16](https://github.com/tau-mud/tau/blob/9ec4b58/packages/world/src/controllers/GameController.ts#L16)

___

### resume

▸ **resume**(`_context`): `Promise`<`any`\>

Called when the controller is resumed.

#### Parameters

| Name | Type |
| :------ | :------ |
| `_context` | [`Context`](tau_world.Services.Sessions.Context.md) |

#### Returns

`Promise`<`any`\>

#### Inherited from

Controller.resume

#### Defined in

[taumud/tau/packages/world/src/Controller.ts:26](https://github.com/tau-mud/tau/blob/9ec4b58/packages/world/src/Controller.ts#L26)

___

### start

▸ **start**(`_context`): `Promise`<`any`\>

called when the controller is started.

#### Parameters

| Name | Type |
| :------ | :------ |
| `_context` | [`Context`](tau_world.Services.Sessions.Context.md) |

#### Returns

`Promise`<`any`\>

#### Inherited from

Controller.start

#### Defined in

[taumud/tau/packages/world/src/Controller.ts:19](https://github.com/tau-mud/tau/blob/9ec4b58/packages/world/src/Controller.ts#L19)
