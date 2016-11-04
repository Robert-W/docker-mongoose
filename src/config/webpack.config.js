const assets = require('./assets');
const path = require('path');
const glob = require('glob');

const makeWebpackConfig = function makeWebpackConfig () {
  // Read in all the entry files
  const configs = glob.sync(assets.webpack).map(function (file) { return require(path.resolve(file)); });
  const entries = configs.reduce(function (all, config) { return Object.assign(all, config.entry); }, {});

  // Return the webpack config
  return {
    entry: entries
  };
};

module.exports = makeWebpackConfig();
