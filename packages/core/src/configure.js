import { defaultsDeep, get } from 'lodash'

export default function (process, config) {
  config = defaultsDeep(
    {
      plugins: []
    },
    config
  )

  return defaultsDeep(
    {
      nodeID: process,
      logger: {
        type: 'Console',
        coloers: true,
        moduleColors: true,
        formatter: 'full',
        autoPadding: true
      },
      logLevel: 'trace',
      transporter: 'nats://localhost:4222',
      casher: 'Redis',
      serializer: 'JSON',
      requestTimeout: 10 * 1000,
      retryPolicy: {
        enabled: false,
        retries: 5,
        delay: 100,
        maxDelay: 1000,
        factor: 2,
        check: (err) => err && !!err.retryable
      },
      maxCallLevel: 100,
      heartbeatInterval: 10,
      heartbeatTimeout: 30,
      contextParamsCloning: false,
      tracking: {
        enabled: false,
        shutdownTimeout: 5000
      },
      disableBalancer: false,
      registry: {
        strategy: 'RoundRobin',
        preferLocal: true
      },
      circuitBreaker: {
        enabled: false,
        threshold: 0.5,
        minRequestCount: 20,
        windowTime: 60,
        halfOpenTime: 10 * 1000,
        check: (err) => err && err.code >= 500
      },
      bulkhead: {
        enabled: false,
        concurrency: 10,
        maxQueueSize: 100
      },
      validator: true,
      errorHandler: null,
      metrics: {
        enabled: false,
        reporter: {
          type: 'Prometheus',
          options: {
            port: 3030,
            path: '/metrics',
            defaultLabels: (registry) => ({
              namespace: registry.broker.namespace,
              nodeID: registry.broker.nodeID
            })
          }
        }
      },
      tracing: {
        enabled: false,
        exporter: {
          type: 'Console', // Console exporter is only for development!
          options: {
            logger: null,
            colors: true,
            width: 100,
            gaugeWidth: 40
          }
        }
      },
      middlewares: [],
      replCommands: null,
      created (broker) {},
      async started (broker) {
        config.plugins.forEach((plugin) => {
          plugin = defaultsDeep(
            {
              services: [],
              portal: {
                services: []
              },
              world: {
                services: []
              }
            },
            plugin
          )
          broker.logger.info(`loading plugin '${plugin.name}'`)
          const globalServices = plugin.services
          const processServices = get(plugin, `${process}.services`)
          const services = globalServices.concat(processServices)

          services.forEach((service) => {
            broker.logger.info(`loading sesrvice '${service.name}'`)
            broker.createService(service)
          })
        })
      },

      // Called after broker stopped.
      async stopped (broker) {}
    },
    config
  )
}
