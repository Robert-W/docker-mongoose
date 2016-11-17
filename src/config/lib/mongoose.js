const path = require('path');
const mongoose = require('mongoose');
const config = require(path.resolve('./config/config'));
const logger = require(path.resolve('./config/lib/winston'));

const loadMongooseModels = function loadMongooseModels () {
  logger.info('Loading mongoose models');
  return new Promise((resolve, reject) => {
    try {
      config.files.models.forEach(model => {
        require(path.resolve(model));
      });
      resolve();
    } catch (err) {
      reject(err);
    }
  });
};

module.exports.connect = function connect () {
  logger.info('Initializing Mongo connection');
  return new Promise((resolve, reject) => {
    // Attempt connection
    mongoose.connect(config.mongo.db, err => {
      if (err) {
        logger.error('Could not connect to Mongo', err);
        reject(err);
      } else {
        logger.info('Connected to Mongo');
        // Try to load all our models
        loadMongooseModels().then(() => {
          resolve(mongoose.connection);
        }, error => {
          logger.error('Could not load Mongoose models', error);
          reject(error);
        });
      }
    });
  });
};
