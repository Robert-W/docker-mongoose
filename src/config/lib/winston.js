const winston = require('winston');

// Add some more config or options later
const logger = new winston.Logger({
  transports: [
    new winston.transports.Console({
      level: 'debug',
      colorize: true,
      timestamp: true
    })
  ]
});

module.exports = logger;
