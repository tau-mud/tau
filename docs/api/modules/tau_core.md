# Module: @tau/core

## Table of contents

### Interfaces

- [IConfiguration](../interfaces/tau_core.IConfiguration.md)
- [IPlugin](../interfaces/tau_core.IPlugin.md)
- [IServiceMap](../interfaces/tau_core.IServiceMap.md)

### Type aliases

- [TPlugin](tau_core.md#tplugin)

### Functions

- [Configure](tau_core.md#configure)
- [CorePlugin](tau_core.md#coreplugin)

## Type aliases

### TPlugin

Ƭ **TPlugin**: (`configuration`: [`IConfiguration`](../interfaces/tau_core.IConfiguration.md)) => [`IPlugin`](../interfaces/tau_core.IPlugin.md)

#### Type declaration

▸ (`configuration`): [`IPlugin`](../interfaces/tau_core.IPlugin.md)

##### Parameters

| Name | Type |
| :------ | :------ |
| `configuration` | [`IConfiguration`](../interfaces/tau_core.IConfiguration.md) |

##### Returns

[`IPlugin`](../interfaces/tau_core.IPlugin.md)

#### Defined in

[taumud/tau/packages/core/src/Plugin.ts:4](https://github.com/tau-mud/tau/blob/9ec4b58/packages/core/src/Plugin.ts#L4)

## Functions

### Configure

▸ **Configure**(`processName`, `config`): `ITauBrokerOptions`

#### Parameters

| Name | Type |
| :------ | :------ |
| `processName` | `string` |
| `config` | [`IConfiguration`](../interfaces/tau_core.IConfiguration.md) |

#### Returns

`ITauBrokerOptions`

#### Defined in

[taumud/tau/packages/core/src/Configure.ts:29](https://github.com/tau-mud/tau/blob/9ec4b58/packages/core/src/Configure.ts#L29)

___

### CorePlugin

▸ **CorePlugin**(`_config`): [`IPlugin`](../interfaces/tau_core.IPlugin.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `_config` | [`IConfiguration`](../interfaces/tau_core.IConfiguration.md) |

#### Returns

[`IPlugin`](../interfaces/tau_core.IPlugin.md)

#### Defined in

[taumud/tau/packages/core/src/CorePlugin.ts:5](https://github.com/tau-mud/tau/blob/9ec4b58/packages/core/src/CorePlugin.ts#L5)
