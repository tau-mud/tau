import {
  BrokerOptions,
  Loggers,
  LoggerConfig,
  LogLevels,
  LogLevelConfig,
  Transporter,
  GenericObject,
  RetryPolicyOptions,
  BrokerTrackingOptions,
  BrokerRegistryOptions,
  BrokerCircuitBreakerOptions,
  BulkheadOptions,
  BrokerTransitOptions,
  Cacher,
  Service,
  Context,
  ServiceBroker,
  BaseValidator,
  ValidatorNames,
  ValidatorOptions,
  Middleware,
  Serializer,
  TracerOptions,
  HotReloadOptions,
  MetricRegistryOptions,
  ServiceSchema,
  ServiceRegistry,
} from "moleculer";

import { defaultsDeep, get } from "lodash";

export interface IConfiguration {
  plugins?: Array<any>;
}

export class Configuration implements BrokerOptions {
  nodeID: string;
  logger?: Loggers.Base | LoggerConfig | Array<LoggerConfig> | boolean;
  logLevel?: LogLevels | LogLevelConfig;
  transporter?: Transporter | string | GenericObject;
  requestTimeout?: number;
  retryPolicy?: RetryPolicyOptions;
  contextParamsCloning?: boolean;
  maxCallLevel?: number;
  heartbeatInterval?: number;
  heartbeatTimeout?: number;
  tracking?: BrokerTrackingOptions;
  disableBalancer?: boolean;
  registry?: BrokerRegistryOptions;
  circuitBreaker?: BrokerCircuitBreakerOptions;
  bulkhead?: BulkheadOptions;
  transit?: BrokerTransitOptions;
  uidGenerator?: () => string;
  errorHandler?: (err: Error, info: any) => void;
  cacher?: boolean | Cacher | string | GenericObject;
  serializer?: Serializer | string | GenericObject;
  validator?: boolean | BaseValidator | ValidatorNames | ValidatorOptions;
  metrics?: boolean | MetricRegistryOptions;
  tracing?: boolean | TracerOptions;
  internalServices?:
    | boolean
    | {
        [key: string]: Partial<ServiceSchema>;
      };
  internalMiddlewares?: boolean;
  dependencyInterval?: number;
  hotReload?: boolean | HotReloadOptions;
  middlewares?: Array<Middleware | string>;
  replCommands?: Array<GenericObject>;
  replDelimiter?: string;
  metadata?: GenericObject;
  ServiceFactory?: typeof Service;
  ContextFactory?: typeof Context;
  Promise?: PromiseConstructorLike;
  skipProcessEventRegistration?: boolean;

  config: IConfiguration;
  processName: string;

  public constructor(processName: string, config: IConfiguration) {
    this.config = defaultsDeep(
      {
        plugins: [],
      },
      config
    );

    this.processName = processName;

    this.nodeID = processName;
    this.logger = {
      type: "Console",
      options: {
        colors: true,
        moduleColors: true,
        formatter: "full",
        autoPadding: true,
      },
    };
    this.logLevel = "trace";
    this.transporter = "nats://localhost:4222";
    this.cacher = "Redis";
    this.serializer = "JSON";
    this.requestTimeout = 10 * 1000;
    this.retryPolicy = {
      enabled: false,
      retries: 5,
      delay: 100,
      maxDelay: 1000,
      factor: 2,
      check: (err) => err && !!err.retryable,
    };
    this.maxCallLevel = 100;
    this.heartbeatInterval = 10;
    this.heartbeatTimeout = 30;
    this.contextParamsCloning = false;
    this.tracking = {
      enabled: false,
      shutdownTimeout: 5000,
    };
    this.disableBalancer = false;
    this.registry = {
      strategy: "RoundRobin",
      preferLocal: true,
    };
    this.circuitBreaker = {
      enabled: false,
      threshold: 0.5,
      minRequestCount: 20,
      windowTime: 60,
      halfOpenTime: 10 * 1000,
      check: (err) => err && err.code >= 500,
    };
    this.bulkhead = {
      enabled: false,
      concurrency: 10,
      maxQueueSize: 100,
    };
    this.validator = true;
    this.errorHandler = null;
    this.metrics = {
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
    };
    (this.tracing = {
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
    }),
      (this.middlewares = []);
    this.replCommands = null;
  }

  started(broker: ServiceBroker) {
    // load the plugins
    this.config.plugins.forEach((plugin) => {
      plugin = defaultsDeep(
        {
          services: [],
          portal: {
            services: [],
          },
          world: {
            services: [],
          },
        },
        plugin
      );

      broker.logger.info(`loading plugin '${plugin.name}'`);
      const globalServices = plugin.services;
      const processServices = get(plugin, `${this.processName}.services`);
      const services = globalServices.concat(processServices);

      services.forEach((PluginService) => {
        const service = new PluginService(broker, this.config);
        broker.logger.info(`loading sesrvice '${service.name}'`);
        broker.createService(service);
      });
    });
  }
}
