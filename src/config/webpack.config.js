const assets = require('./assets');
const config = require('./config');
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
  const packs = glob.sync(assets.webpack).map(file => require(path.resolve(file)));
  // Merge all the entries together
  const entries = packs.reduce(function (all, pack) { return Object.assign(all, pack.entry); }, {});
  // Merge all the aliases together
  const alias = packs.reduce(function (all, pack) { return Object.assign(all, pack.alias); }, {});
  // Make their paths correct
  for (const key in entries) { entries[key] = path.resolve(entries[key]); }
  for (const key in alias) { alias[key] = path.resolve(alias[key]); }
  // Generate an array of HtmlWebpackPlugin options
  // const htmlWebpackPlugins = packs.reduce((plugins, pack) => {
  //   return Object.keys(pack.html).map(key => pack.html[key]);
  // }, []);
  // Return the webpack config
  return Object.assign({}, config.webpack, {
    entry: entries,
    resolve: { alias },
    module: {
      rules: [{
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
      }, {
        test: /\.js?$/,
        loader: 'babel-loader',
        exclude: /(node_modules)/,
        query: {
          presets: ['es2015', 'react', 'stage-0'],
          plugins: ['transform-runtime']
        }
      }]
    }
  });
};

module.exports = makeWebpackConfig();
