const assets = require('./assets');
const path = require('path');
const glob = require('glob');

/**
* @function makeAbsolutePath
* @summary Update all the config's relative paths to absolute paths
* @param {string} base - base directory of the config file
* @param {object} config - config object
* @param {string} field - field in the config to update
* e.g { entry: { home: './home.js', signin: './signin.js' }} from app/home/client =>
* { entry: { home: 'app/home/client/home.js', signin: 'app/home/client/signin.js' }}
*/
// const makeAbsolutePath = function makeAbsolutePath (base, config, field) {
//   Object.keys(config[field]).forEach(name => {
//     if (typeof config[field][name] === 'string') {
//       config[field][name] = path.join(base, config[field][name]);
//     }
//   });
// };

/**
* @function makeWebpackConfig
* @summary Read all the webpack config files and merge them together to make one correct config
* @TODO Make this read the NODE_ENV variable and generate the appropriate config
*/
const makeWebpackConfig = function makeWebpackConfig () {
  // Read in all the entry files
  const configs = glob.sync(assets.webpack).map(file => require(path.resolve(file)));
  // Merge all the entries together
  const entries = configs.reduce(function (all, config) { return Object.assign(all, config.entry); }, {});
  // Generate an array of HtmlWebpackPlugin options
  const htmlWebpackPlugins = configs.reduce((plugins, config) => {
    return Object.keys(config.html).map(key => config.html[key]);
  }, []);
  // Return the webpack config
  return {
    entry: entries,
    plugins: [
      ...htmlWebpackPlugins
    ]
  };
};

console.log(makeWebpackConfig());

module.exports = makeWebpackConfig();
