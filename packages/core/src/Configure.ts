import {
  ServiceBroker,
  BrokerOptions,
  ServiceSchema,
  ServiceRegistry,
} from "moleculer";
import { defaultsDeep, get, values } from "lodash";

import { TPlugin } from "./Plugin";

// Redis configuration
interface IRedisConfig {
  host: string;
  port: string;
}

// Base configuration
export interface IConfiguration extends BrokerOptions {
  // List of plugins to load
  plugins?: Array<TPlugin>;
  // Services to load
  services?: Array<ServiceSchema>;
  // Template registry
  templates?: Array<any>;
  // Redis configuration
  redis: IRedisConfig;
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

  const brokerConfig = {
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
    cacher: {
      type: "Redis",
      options: {
        redis: {
          host: config.redis.host,
          port: config.redis.port,
        },
      },
    },
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
    started(broker) {
      broker.runner.config.services.forEach((service) => {
        broker.createService(service);
      });
    },
  };

  config = defaultsDeep(brokerConfig, loadPlugins(processName, config));

  return config;
}

function loadPlugins(processName: string, config: IConfiguration) {
  config = defaultsDeep(
    { name: processName },
    config.plugins.reduce((mergedConfig: IConfiguration, plugin) => {
      const pc = plugin(config);
      return defaultsDeep({ ...mergedConfig }, pc);
    }, config)
  );

  config = { ...config, services: loadServices(config, processName) };

  return config;
}

function loadServices(config, processName) {
  const globalServices = config.services;
  const processServices = get(config, `${processName}.services`);
  const fullList = {
    ...globalServices,
    ...processServices,
  };

  return values(fullList).map((service) => service(config));
}
