const path = require('path');
const mongoose = require('mongoose');
const logger = require(path.resolve('./config/lib/bunyan'));
const config = require(path.resolve('./config/config'));

const loadMongooseModels = function loadMongooseModels () {
  logger.info('Loading mongoose models');
  return new Promise((resolve, reject) => {
    // Load mongoose models via globs so they can exist all over the applicaton
    // in areas that make the most sense
    resolve();
  });
};

module.exports.connect = function connect () {
  logger.info('Initializing Mongo connection');
  return new Promise((resolve, reject) => {
    // Attempt connection
    const db = mongoose.connect(config.mongo.db, err => {
      if (err) {
        logger.fatal({ err }, 'Could not connect to Mongo');
        reject(err);
      } else {
        logger.info('Connected to Mongo');
        // Try to load all our models
        loadMongooseModels().then(() => {
          resolve(db);
        }).catch(err => {
          logger.fatal({ err }, 'Could not load Mongoose models');
          reject(err);
        });
      }
    });
    resolve();

  });
};
