const path = require('path');
const glob = require('glob');
const assets = require('./assets');
const logger = require(path.resolve('./config/lib/winston'));

const getFilesConfig = function getFilesConfig (assets) {
  return {
    files: {
      // Get mongoose models
      models: glob.sync(assets.models),
      // Get express routes
      routes: glob.sync(assets.routes)
    }
  };
};

const initConfig = function initConfig () {
  // Validate NODE_ENV
  if (process.env.NODE_ENV === null) {
    logger.warn('NODE_ENV is not set, setting to "development"');
    process.env.NODE_ENV = 'development';
  }
  // Get default config
  const defaultConfig = require(path.resolve('./config/env/default'));
  // Get environment config
  let environmentConfig;
  try {
    environmentConfig = require(path.resolve(`./config/env/${process.env.NODE_ENV}`));
  } catch (err) {
    logger.warn(`No configuration files found matching environemnt ${process.env.NODE_ENV}`);
    environmentConfig = {};
  }
  // Get global files config
  const filesConfig = getFilesConfig(assets);
  // Merge in all config options
  return Object.assign({}, defaultConfig, environmentConfig, filesConfig);
};

module.exports = initConfig();
