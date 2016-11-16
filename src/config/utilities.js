const mongoose = require('mongoose');
const config = require('./config');

/**
* @function isValidPassword
* @summary validate the provided password meets all the requirements
* @param {string} value
* @return boolean
*/
const isValidPassword = function isValidPassword (password) {
  return (
    password !== null &&
    password.length >= config.passwordRequirements.length &&
    config.passwordRequirements.rules.every(rule => rule.regex.test(password))
  );
};

/**
* @function isNotEmpty
* @summary validate the provided value is not empty
* @param {string} value
* @return boolean
*/
const isNotEmpty = function isNotEmpty (value) {
  return value !== null && value.length > 0;
};

/**
* @function isUnique
* @summary validate the provided value is not in the provided model
* @param {string} model - model to validate value against
* @param {string} fieldname
* @return function - a validator function that will pass a boolean through the callback
*/
const isUnique = function isUnique (model, fieldname) {
  return (value, callback) => {
    // If it must be unique then it must also not be empty
    if (!isNotEmpty(value)) {
      return callback(false);
    }
    // Build the query
    const query = {};
    query[fieldname] = value;
    query._id = { $ne: this._id };
    // Then check for a record in the collection
    return mongoose.model(model).findOne(query).exec((err, result) => {
      if (err) { return callback(false); }
      return callback(!result); // should be empty
    });
  };
};

/**
* @function webpackDevLogger
* @summary log some output for webpack's dev server
* @param {string} port - port we are listening to
* @param {string} public - public directory we are using
* @return function - a simple logging function
*/
const webpackDevLogger = function webpackDevLogger (port, publicPath) {
  return function () {
    console.log('[\x1B[34mexpress\x1B[39m] \x1B[1mDev Server\x1B[1m');
    console.log('\x1B[37m------------------------------\x1B[39m');
    console.log(`\x1B[1mAccess:\x1B[1m \x1B[35mhttp://localhost:${port}\x1B[39m`);
    console.log('\x1B[37m------------------------------\x1B[39m');
    console.log(`[\x1B[34mexpress\x1B[39m] Serving files from \x1B[35m${publicPath}\x1B[39m`);
    console.log('[\x1B[34mexpress\x1B[39m] \x1B[1mWebpack compiling...\x1B[1m');
    console.log('\x1B[37m------------------------------\x1B[39m');
    console.log();
  };
};


module.exports = {
  validators: {
    isValidPassword: isValidPassword,
    isNotEmpty: isNotEmpty,
    isUnique: isUnique
  },
  webpack: {
    devLogger: webpackDevLogger
  }
};
