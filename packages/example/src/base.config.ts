import { PortalPlugin } from '@tau/portal'
import { CorePlugin } from '@tau/core'
import { WorldPlugin } from '@tau/world'
import { AccountsPlugin } from '@tau/accounts'

export default {
  plugins: [
    CorePlugin,
    PortalPlugin,
    WorldPlugin,
    AccountsPlugin
  ],
  redis: {
    host: "localhost",
    port: 6379,
  }
}
