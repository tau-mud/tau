# Module: @tau/world

## Table of contents

### Namespaces

- [Controllers](tau_world.Controllers.md)
- [DataSources](tau_world.DataSources.md)
- [Services](tau_world.Services.md)

### Interfaces

- [IEntity](../interfaces/tau_world.IEntity.md)
- [ITemplate](../interfaces/tau_world.ITemplate.md)

### Type aliases

- [TTemplateContext](tau_world.md#ttemplatecontext)
- [TTemplateFunction](tau_world.md#ttemplatefunction)

### Variables

- [System](tau_world.md#system)

### Functions

- [WorldPlugin](tau_world.md#worldplugin)

## Type aliases

### TTemplateContext

Ƭ **TTemplateContext**: `any`

The Template Context is any arguments passed to the template for its use.

#### Defined in

[taumud/tau/packages/world/src/Template.ts:4](https://github.com/tau-mud/tau/blob/b8e3567/packages/world/src/Template.ts#L4)

___

### TTemplateFunction

Ƭ **TTemplateFunction**: (`context`: [`TTemplateContext`](tau_world.md#ttemplatecontext)) => `JSX.Element`

#### Type declaration

▸ (`context`): `JSX.Element`

 A function that returns a `ink` based React element.

##### Parameters

| Name | Type |
| :------ | :------ |
| `context` | [`TTemplateContext`](tau_world.md#ttemplatecontext) |

##### Returns

`JSX.Element`

#### Defined in

[taumud/tau/packages/world/src/Template.ts:9](https://github.com/tau-mud/tau/blob/b8e3567/packages/world/src/Template.ts#L9)

## Variables

### System

• `Const` **System**: `ServiceSchema`

This is a [Moleculer mixin](https://moleculer.services/docs/0.14/services.html#Mixins) that
can be used to create systems within Tau's Entity Component System framework. Whenever a game
entity is created, updated, or destroyed, the system will be notified, and apply its filter to
the entity. If the entity matches, it will call the appropriate callbacks.

### Filters
Filters are the method by which a system determines whether an entity should be processed. Every
system should have a filter, otherwise it will match every entity. Filters are simply
[NeDB queries](https://github.com/louischatriot/nedb#basic-querying) that are runa gainst the
[@tau/world.Services.Entities.Registry](../classes/tau_world.Services.Entities.Registry.md) service, which is simply an NeDB in memory database.

### Callbacks
Callbacks are the method by which a system processes an entity. Developers can override the
callbacks to implement behaviours when the entity is created, updated, or destroyed.

#### Defined in

[taumud/tau/packages/world/src/System.ts:19](https://github.com/tau-mud/tau/blob/b8e3567/packages/world/src/System.ts#L19)

## Functions

### WorldPlugin

▸ **WorldPlugin**(`_config`): `IPlugin`

The World plugin is one of the two primary plugins that make up a Tau based game. It handles all interactions between
the player and the game world. This plugin should be loaded after `@tau/core` and before any other plugins
excepting `@tau/portal`.

#### Parameters

| Name | Type |
| :------ | :------ |
| `_config` | `IWorldConfiguration` |

#### Returns

`IPlugin`

#### Defined in

[taumud/tau/packages/world/src/WorldPlugin.ts:21](https://github.com/tau-mud/tau/blob/b8e3567/packages/world/src/WorldPlugin.ts#L21)
