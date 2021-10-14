import { v4 as uuidv4 } from 'uuid'

export default function (socket) {
  const uuid = uuidv4()

  return {
    name: `tau.portal.connections.${uuid}`,
    settings: {
      uuid,
      remoteAddress: socket.remoteAddress
    },
    created () {
      this.socket = socket
      this.socket.on('close', this.handleDisconnect)

      this.logger.info('creating session')
      this.notifySessionCreated()
    },
    actions: {
      puts (ctx) {
        this.puts(ctx.params.message)
      }
    },
    methods: {
      puts (message) {
        this.socket.write(`${message}\r\n`)
      },
      notifySessionCreated () {
        this.broker.broadcast('tau.portal.connections.created', {
          uuid: this.settings.uuid,
          remoteAddress: this.settings.remoteAddress
        })
      },
      handleDisconnect () {
        this.logger.info('disconnected')
        this.broker.broadcast(`tau.portal.connections.disconnected.${this.settings.uuid}`, {
          uuid: this.settings.uuid
        })
        this.broker.destroyService(this)
      }
    }
  }
}
