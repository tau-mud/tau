# Class: StartController

[@tau/world](../modules/tau_world.md).[Controllers](../modules/tau_world.Controllers.md).StartController

The `StartController` is called as soon as a new session is started. It simply displays the
Tau MUD Engine version information.

## Hierarchy

- `Controller`

  ↳ **`StartController`**

## Table of contents

### Constructors

- [constructor](tau_world.Controllers.StartController.md#constructor)

### Properties

- [name](tau_world.Controllers.StartController.md#name)

### Methods

- [handleInput](tau_world.Controllers.StartController.md#handleinput)
- [resume](tau_world.Controllers.StartController.md#resume)
- [start](tau_world.Controllers.StartController.md#start)

## Constructors

### constructor

• **new StartController**()

#### Inherited from

Controller.constructor

## Properties

### name

• `Readonly` **name**: ``"start"``

#### Overrides

Controller.name

#### Defined in

[taumud/tau/packages/world/src/controllers/StartController.ts:9](https://github.com/tau-mud/tau/blob/b8e3567/packages/world/src/controllers/StartController.ts#L9)

## Methods

### handleInput

▸ **handleInput**(`_context`, `_messageContext`): `Promise`<`any`\>

Handles input from the player connection.

#### Parameters

| Name | Type |
| :------ | :------ |
| `_context` | [`Context`](tau_world.Services.Sessions.Context.md) |
| `_messageContext` | `IMessageContext` |

#### Returns

`Promise`<`any`\>

#### Inherited from

Controller.handleInput

#### Defined in

[taumud/tau/packages/world/src/Controller.ts:33](https://github.com/tau-mud/tau/blob/b8e3567/packages/world/src/Controller.ts#L33)

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

[taumud/tau/packages/world/src/Controller.ts:26](https://github.com/tau-mud/tau/blob/b8e3567/packages/world/src/Controller.ts#L26)

___

### start

▸ `Private` **start**(`context`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `context` | [`Context`](tau_world.Services.Sessions.Context.md) |

#### Returns

`Promise`<`any`\>

#### Overrides

Controller.start

#### Defined in

[taumud/tau/packages/world/src/controllers/StartController.ts:13](https://github.com/tau-mud/tau/blob/b8e3567/packages/world/src/controllers/StartController.ts#L13)
