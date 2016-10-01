const path = require('path');
const logger = require(path.resolve('./config/lib/bunyan'));

const initConfig = function initConfig () {
  // Validate NODE_ENV
  if (process.env.NODE_ENV == null) {
    logger.warn('NODE_ENV is not set, setting to "development"');
    process.env.NODE_ENV = 'development';
  }
  // Get default config
  const defaultConfig = require(path.resolve('./config/env/default'));
  // Get environment config and validate it
  let environmentConfig;
  try {
    environmentConfig = require(path.resolve(`./config/env/${process.env.NODE_ENV}`));
  } catch (err) {
    environmentConfig = {};
  }
  // Merge in defaults and environment config, not yet created
  const config = Object.assign({}, defaultConfig, environmentConfig);
  // Add any extras if necessary to config
  return config;
};

module.exports = initConfig();
