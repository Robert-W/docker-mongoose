const mongoose = require('mongoose');
const config = require('./config');

/**
* @function ensureAuthenticated
* @summary middleware to ensure the user is authenticated
* @param {Request} req - Express request object
* @param {Response} res - Express response object
* @param {Function} next - Next middleware
*/
const ensureAuthenticated = function ensureAuthenticated (req, res, next) {
  if (req.isAuthenticated && req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
};

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


module.exports = {
  ensureAuthenticated: ensureAuthenticated,
  validators: {
    isValidPassword: isValidPassword,
    isNotEmpty: isNotEmpty,
    isUnique: isUnique
  }
};
