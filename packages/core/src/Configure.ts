import {
  ServiceBroker,
  BrokerOptions,
  ServiceSchema,
  ServiceRegistry,
} from "moleculer";
import { defaultsDeep, get } from "lodash";

import { TPlugin } from "./Plugin";

export interface IConfiguration {
  plugins?: Array<TPlugin>;
  services?: Array<ServiceSchema>;
  templates?: Array<any>;
}

export type TBrokerOptions = BrokerOptions;

export function Configure(
  processName: string,
  config: IConfiguration
): TBrokerOptions {
  config = defaultsDeep(
    {
      plugins: [],
    },
    config
  );

  return {
    nodeID: processName,
    logger: {
      type: "Console",
      options: {
        colors: true,
        moduleColors: true,
        formatter: "full",
        autoPadding: true,
      },
    },
    logLevel: "trace",
    transporter: "nats://localhost:4222",
    cacher: "Redis",
    serializer: "JSON",
    requestTimeout: 10 * 1000,
    retryPolicy: {
      enabled: false,
      retries: 5,
      delay: 100,
      maxDelay: 1000,
      factor: 2,
      check: (err) => err && !!err.retryable,
    },
    maxCallLevel: 100,
    heartbeatInterval: 10,
    heartbeatTimeout: 30,
    contextParamsCloning: false,
    tracking: {
      enabled: false,
      shutdownTimeout: 5000,
    },
    disableBalancer: false,
    registry: {
      strategy: "RoundRobin",
      preferLocal: true,
    },
    circuitBreaker: {
      enabled: false,
      threshold: 0.5,
      minRequestCount: 20,
      windowTime: 60,
      halfOpenTime: 10 * 1000,
      check: (err) => err && err.code >= 500,
    },
    bulkhead: {
      enabled: false,
      concurrency: 10,
      maxQueueSize: 100,
    },
    validator: true,
    errorHandler: null,
    metrics: {
      enabled: false,
      reporter: {
        type: "Prometheus",
        options: {
          port: 3030,
          path: "/metrics",
          defaultLabels: (registry: ServiceRegistry) => ({
            namespace: registry.broker.namespace,
            nodeID: registry.broker.nodeID,
          }),
        },
      },
    },
    tracing: {
      enabled: false,
      exporter: {
        type: "Console", // Console exporter is only for development!
        options: {
          logger: null,
          colors: true,
          width: 100,
          gaugeWidth: 40,
        },
      },
    },
    middlewares: [],
    replCommands: null,
    started(broker: ServiceBroker): Promise<void> {
      loadPlugins(processName, broker, config);
      return Promise.resolve();
    },
  };
}

function loadPlugins(
  processName: string,
  broker: ServiceBroker,
  config: IConfiguration
) {
  broker.logger.info("loading TAU plugins");
  config = defaultsDeep(
    { name: processName },
    config.plugins.reduce((mergedConfig: IConfiguration, plugin) => {
      const pc = plugin(config);
      return defaultsDeep({ ...mergedConfig }, pc);
    }, config)
  );

  broker.logger.debug("configuration:");
  broker.logger.debug(config);

  loadServices(processName, broker, config);
}

function loadServices(
  processName: string,
  broker: ServiceBroker,
  config: IConfiguration
) {
  broker.logger.info(`loading services for process '${processName}'`);
  const globalServices = config.services;
  const processServices = get(config, `${processName}.services`);
  const services = {
    ...globalServices,
    ...processServices,
  };

  Object.values(services).forEach((PluginService: any) => {
    const service = new PluginService(config);
    broker.logger.info(`loading sesrvice '${service.name}'`);
    broker.createService(service);
  });
}
