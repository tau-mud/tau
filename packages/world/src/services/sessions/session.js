export default function (params) {
  const schema = {
    name: `tau.world.sessions.${params.uuid}`,
    dependencies: [`tau.portal.connections.${params.uuid}`],
    settings: {
      uuid: params.uuid,
      remote: params.remoteAddress
    },
    events: {
      'tau.portal.started' () {
        this.destroySession()
      }
    },
    actions: {
      puts (ctx) {
        this.puts(ctx.params)
      }
    },
    methods: {
      puts (message) {
        this.broker.call(`tau.portal.connections.${this.settings.uuid}.puts`, { message })
      },
      destroySession () {
        this.broker.broadcast(`tau.world.sessions.destroyed.${this.settings.uuid}`, {
          uuid: this.settings.uuid
        })

        this.broker.destroyService(this)
      }
    }
  }

  schema.events[`tau.portal.connections.disconnected.${params.uuid}`] = () => {
    this.logger.info('connection has been terminated, closing session')
    this.destroySession()
  }

  return schema
}
