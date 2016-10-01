const path = require('path');
const logger = require(path.resolve('./config/lib/bunyan'));

module.exports.connect = function connect () {
  logger.info('Initializing MongoDB connection');
  return new Promise(function (resolve, reject) {

    // error
    // logger.fatal('Could not connect to MongoDB');
    // reject('error');

    // success
    logger.info('MongoDB connected');
    resolve();

  });
};
