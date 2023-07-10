// file: logging/log-util.ts
// https://giancarlobuomprisco.com/next/how-to-build-production-grade-nextjs-projects
// https://levelup.gitconnected.com/better-logging-in-next-js-apps-with-pino-f973de4dd8dd
// https://betterstack.com/community/guides/logging/how-to-install-setup-and-use-pino-to-log-node-js-applications/
import { env } from '@/env.mjs';
import pino, { type Logger } from 'pino';

import logLevelData from './log-level';

const logLevels = new Map<string, string>(Object.entries(logLevelData));

export function getLogLevel(logger: string): string {
  return (env.LOG_LEVEL as string) || logLevels.get(logger) || logLevels.get('*') || 'info';
}

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
