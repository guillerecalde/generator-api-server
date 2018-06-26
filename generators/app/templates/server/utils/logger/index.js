const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  colorize: true,
  format: winston.format.simple(),
  transports: [
    new winston.transports.Console()
  ]
});

module.exports = logger;
