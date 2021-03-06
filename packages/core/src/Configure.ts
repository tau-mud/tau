import Moleculer, {
  BrokerOptions,
  ServiceSchema,
  ServiceRegistry,
  ServiceSettingSchema,
} from "moleculer";
import { defaultsDeep, flattenDeep, get, values } from "lodash";

import { Service } from "./Service";
import { TPlugin } from "./Plugin";

// Redis configuration
interface IRedisConfig {
  host: string;
  port: string;
}

// Base configuration
export interface IConfiguration {
  // List of plugins to load
  plugins?: Array<TPlugin>;
  // Services to load
  services?: Array<ServiceSchema>;
  // Template registry
  templates?: Array<any>;
  // Redis configuration
  redis: IRedisConfig;
}

// @private
export interface ITauBrokerOptions extends BrokerOptions {
  tau: IConfiguration;
}

export function Configure(processName: string, config: IConfiguration): ITauBrokerOptions {
  const tau = loadPlugins(processName, config);

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
    maxCallLevel: 100,
    heartbeatInterval: 10,
    heartbeatTimeout: 30,
    contextParamsCloning: false,
    tracking: {
      enabled: false,
      shutdownTimeout: 5000,
    },
    ServiceFactory: <typeof Moleculer.Service>Service,
    disableBalancer: false,
    registry: {
      strategy: "RoundRobin",
      preferLocal: true,
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
      const options = broker.runner.config;
      const services = values(get(options, "tau.services"));
      broker.logger.info(`loading ${services.length} services`);
      services.forEach((service) => {
        if (typeof service === "function") {
          service = new service(broker);
        }

        broker.logger.info("starting service", service.name);
        broker.createService(service);
      });
    },
    tau,
  };
}

function loadPlugins(processName: string, config: IConfiguration) {
  const plugins = config.plugins.map((plugin) => plugin(config));

  const services = flattenDeep([
    config.services || [],
    plugins.map((plugin) => values(plugin.services || {})),
    plugins.map((plugin) => values(get(plugin, `${processName}.services`, {}))),
  ]);

  return { ...config, services };
}

function loadServices(config, processName) {
  const globalServices = config.services;
  const processServices = get(config, `${processName}.services`);
  const fullList = {
    ...globalServices,
    ...processServices,
  };

  return values(fullList).map((service) => service);
}
