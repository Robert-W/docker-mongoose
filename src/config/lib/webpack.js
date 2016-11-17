const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const ProgressPlugin = require('webpack/lib/ProgressPlugin');
const webpack = require('webpack');
const path = require('path');
const webpackConfig = require(path.resolve('./config/webpack.config'));
const logger = require(path.resolve('./config/lib/winston'));
const config = require(path.resolve('./config/config'));

/**
* @function generateMap
* @summary Generate a map of bundle paths
* @param {object} compilationStats - build stats from webpack
* @return {object}
*/
const updateAssetMap = function updateAssetMap (compilationStats) {
  console.dir(compilationStats);
  console.dir(config);
};

module.exports.getMiddleware = function getMiddleware () {
  // Create a compiler
  const compiler = webpack(webpackConfig, (err, statistics) => {
    const stats = statistics.toJson();
    // Check for fatal errors
    if (err) {
      logger.error('Fatal compilation error with Webpack', err);
      return;
    }
    // Check for soft errors
    if (stats && stats.errors && stats.errors.length > 0) {
      logger.error('Soft compilation error with Webpack', stats.errors);
      return;
    }
    // Check for warnings
    if (stats && stats.warnings && stats.warnings.length > 0) {
      logger.warn('Soft compilation error with Webpack', stats.warnings);
      return;
    }
    // Update asset hash
    logger.info('Webpack successfully compiled. Updating asset map');
    updateAssetMap(stats);
  });

  return {
    devMiddleware: webpackDevMiddleware(compiler, { stats: { colors: true } }),
    hotMiddleware: webpackHotMiddleware(compiler)
  };
};

module.exports.build = function build () {
  return new Promise((resolve, reject) => {
    const compiler = webpack(webpackConfig);
    // Output progress
    compiler.apply(new ProgressPlugin(function (percentage, msg) {
      const message = Math.floor(percentage * 100) + '% ' + msg.toString();
      process.stdout.clearLine();
      process.stdout.cursorTo(0);
      process.stdout.write(message);
    }));

    logger.info('\x1B[1mStarting build script\x1B[22m');
    logger.info('---------------------');

    // Start the compilation
    compiler.run((err, statistics) => {
      if (err) { return reject(err); }
      // Clear standard out
      process.stdout.clearLine();
      process.stdout.cursorTo(0);
      // Log some statistics
      logger.info(statistics.toString({
        errorDetails: true,
        warnings: true,
        chunks: false,
        colors: true
      }));

      logger.info('\x1B[1mWebpack bundling has completed\x1B[22m');
      logger.info('------------------------------');
      // Update asset map
      updateAssetMap(statistics.toJson());
      resolve();
    });
  });
};
