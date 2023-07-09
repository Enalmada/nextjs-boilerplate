// next-logger.config.js
const pino = require("pino");

const logger = (defaultConfig) =>
  pino({
    ...defaultConfig,
    messageKey: "message",
    mixin: () => ({ name: "custom-pino-instance" }),
    formatters: {
      level: (label) => {
        return { level: label.toUpperCase() };
      },
    },
    timestamp: pino.stdTimeFunctions.isoTime,
  });

module.exports = {
  logger,
};
