import { defaultsDeep } from 'lodash'

import { Configure, TBrokerOptions } from '@tau/core';

import baseConfig from './base.config'

const config: TBrokerOptions = Configure('portal', defaultsDeep(baseConfig, {}))
export default config
