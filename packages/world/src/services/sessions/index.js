import Session from './session'

export default {
  name: 'tau.world.sessions',
  dependencies: ['tau.portal'],
  started () {
    this.broker.broadcast('tau.world.sessions.started')
    this.broker.call('tau.portal.getConnections')
      .then((connections) => {
        connections.forEach((conn) => {
          this.createSession(conn)
        })
      })
  },
  events: {
    'tau.portal.connections.created' (ctx) {
      this.createSession(ctx.params)
    }
  },
  methods: {
    createSession (conn) {
      console.log(conn)
      this.logger.info(`creating session for ${conn.uuid}`)
      this.broker.createService(new Session(conn))
    }
  }
}
