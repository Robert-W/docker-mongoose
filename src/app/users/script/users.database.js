const mongoose = require('mongoose');
const User = mongoose.model('User');
const path = require('path');
const logger = require(path.resolve('./config/lib/winston'));
const config = require(path.resolve('./config/config'));

exports.dropCollection = function dropCollection () {
  logger.info('Dropping User collection');
  return new Promise((resolve, reject) => {
    mongoose.connection.db.dropCollection('User', err => {
      if (err) {
        logger.error('Unable to drop user collection', err);
        return reject(err);
      }
      resolve();
    });
  });
};

exports.populateCollection = function populateCollection () {
  logger.info('Populating User collection');
  return new Promise((resolve, reject) => {
    if (!config.adminUser || !config.adminUser.username || !config.adminUser.password) {
      logger.error('Missing default admin user');
      return reject();
    }

    User.findOne({ username: config.adminUser.username }).exec().then(user => {
      if (user) {
        logger.info('Admin user already created');
        return resolve();
      }

      const admin = new User({
        username: config.adminUser.username,
        password: config.adminUser.password,
        firstName: 'Admin',
        lastName: 'Admin',
        email: 'admin@gmail.com'
      });

      admin.save(err => {
        if (err) {
          logger.error('Unable to create admin user', err);
          return reject(err);
        }
        logger.info('Created default admin user');
        resolve();
      });
    });
  });
};
