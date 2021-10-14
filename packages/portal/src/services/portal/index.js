import net from 'net'

import Connection from './connection'

const schema = {
  name: 'tau.portal',
  created () {
    this.connections = {}
    this.server = net.createServer()
  },
  started () {
    return new Promise((resolve) => {
      this.server.on('listening', resolve)
      this.server.on('connection', (socket) => {
        const conn = new Connection(socket)
        const service = this.broker.createService(conn)

        this.connections[conn.settings.uuid] = service
      })
      this.server.listen(4000, '127.0.0.1')
      this.broker.broadcast('tau.portal.started')
    })
  },
  actions: {
    getConnections () {
      return Object.values(this.connections).map((conn) => conn.settings)
    }
  },
  events: {
  }
}

schema.events['tau.portal.connections.disconnected.*'] = function (ctx) {
  this.logger.debug('received disconnect notice, removing connection from registry')
  delete this.connections[ctx.params.uuid]
}

export default schema
