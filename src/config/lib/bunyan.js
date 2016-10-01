const bunyan = require('bunyan');

// Add some more config or options later
const logger = bunyan.createLogger({
  name: 'docker-graphql'
});

module.exports = logger;
