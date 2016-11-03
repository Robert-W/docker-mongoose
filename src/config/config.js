const path = require('path');
const glob = require('glob');
const assets = require('./assets');
const logger = require(path.resolve('./config/lib/winston'));

const getFilesConfig = function getFilesConfig (deps) {
  return {
    files: {
      // Get populate scripts
      scripts: glob.sync(deps.scripts),
      // Get mongoose models
      models: glob.sync(deps.models),
      // Get express routes
      routes: glob.sync(deps.routes),
      // Get test files
      tests: glob.sync(deps.tests),
      // Get pages
      views: glob.sync(deps.views)
    }
  };
};

const initConfig = function initConfig () {
  // Validate NODE_ENV
  if (process.env.NODE_ENV === null || process.env.NODE_ENV === undefined) {
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
