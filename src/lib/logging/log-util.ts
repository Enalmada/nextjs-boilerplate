// file: logging/log-util.ts
// https://giancarlobuomprisco.com/next/how-to-build-production-grade-nextjs-projects
// https://levelup.gitconnected.com/better-logging-in-next-js-apps-with-pino-f973de4dd8dd
// https://betterstack.com/community/guides/logging/how-to-install-setup-and-use-pino-to-log-node-js-applications/
import { type MyContextType } from '@/server/graphql/server';
import { Logger as AxiomLogger } from 'next-axiom';

import logLevelData from './log-level';

// Axiom works on server but it adds "frontend" to the logs.
// This switches it back to backend logging until next-axiom is working right
// Tried using pino transport but had build issues (that can't be solved without breaking edge compat)
// - winston doesn't support edge.
// abstract out direct axiom call from rest of code
// add userId to all context

const logLevels = new Map<string, string>(Object.entries(logLevelData));

export function getLogLevel(logger: string): string {
  return (process.env.LOG_LEVEL as string) || logLevels.get(logger) || logLevels.get('*') || 'info';
}

export default class Logger {
  private readonly loggerName: string;
  private readonly logger: AxiomLogger;
  constructor(
    name: string,
    ctx?: MyContextType,
    config?: Record<string, unknown>,
    logger?: AxiomLogger
  ) {
    this.loggerName = name;
    this.logger = logger || getAxiomLogger({ name: this.loggerName, ...config }, ctx);
  }

  // pino compat as trace is used in next-logger
  trace(message: string, args: Record<string, unknown> = {}) {
    this.logger.debug(message, args);
  }

  debug(message: string, args: Record<string, unknown> = {}) {
    this.logger.debug(message, args);
  }

  info(message: string, args: Record<string, unknown> = {}) {
    this.logger.info(message, args);
  }

  warn(message: string, args: Record<string, unknown> = {}) {
    this.logger.warn(message, args);
  }

  error(message: string, args: Record<string, unknown> = {}) {
    this.logger.error(message, args);
  }

  with(ctx: MyContextType, config: Record<string, unknown> = {}): Logger {
    const axiomChildLogger = getChildAxiomLogger(this.logger, ctx, { ...config });
    return new Logger(this.loggerName, undefined, undefined, axiomChildLogger);
  }

  // pino compatibility for next-logger
  child(config: Record<string, unknown> = {}): Logger {
    const axiomChildLogger = getChildAxiomLogger(this.logger, undefined, { ...config });
    return new Logger(this.loggerName, undefined, undefined, axiomChildLogger);
  }

  logMethodStart(
    methodName: string,
    ctx: MyContextType,
    config: Record<string, unknown> = {}
  ): Logger {
    const childLogger = this.with(ctx, {
      method: methodName,
      userId: ctx?.currentUser?.id,
      ...config,
    });
    childLogger.info('started');
    return childLogger;
  }
}

/*
export type LoggerConfig = {
  args?: { [key: string]: any };
  logLevel?: LogLevel;
  autoFlush?: boolean;
  source?: string;
  req?: any;
};
 */

export function getAxiomLogger(
  config?: Record<string, unknown>,
  ctx?: MyContextType,
  source: 'frontend' | 'lambda' | 'edge' = 'lambda'
): AxiomLogger {
  // const report = env.APP_ENV === 'local' ? null : ctx?.report;
  // Latest AxiomLogger says error TS2554: Expected 0-1 arguments, but got 4.  No report constructor?
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return new AxiomLogger({ config, autoFlush: true, source });
}

export function getChildAxiomLogger(
  axiomLogger: AxiomLogger | null,
  ctx?: MyContextType,
  bindings: Record<string, unknown> | undefined = {}
) {
  let childAxiomLogger: AxiomLogger;
  if (axiomLogger) {
    childAxiomLogger = axiomLogger.with(bindings);
  } else {
    childAxiomLogger = getAxiomLogger(bindings, ctx);
  }

  return childAxiomLogger;
}

/*  Pino stuff for reference
export function getLogger(name: string, config?: Record<string, unknown>): Logger {
  return pino({
    name,
    level: getLogLevel(name),
    browser: {},
    formatters: {
      level: (label) => {
        return { level: label.toUpperCase() };
      },
    },
    timestamp: pino.stdTimeFunctions.isoTime,
    base: {
      revision: process.env.VERCEL_GITHUB_COMMIT_SHA,
    },
    redact: {
      paths: ['password', 'token'],
    },
    ...config,
  });
}


export function getChildLogger(logger: Logger, bindings: Record<string, unknown>) {
  const childLogger = logger.child(bindings);
  childLogger.info('started');
  return childLogger;
}

 */
