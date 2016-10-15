const express = require('express');
const path = require('path');
const logger = require(path.resolve('./config/lib/winston'));
const config = require(path.resolve('./config/config'));

/**
* @function loadServerRoutes
* @summary Configure valid express server routes
* @param {Express.app} app
*/
const loadServerRoutes = function loadServerRoutes (app) {
  config.files.routes.forEach(route => {
    require(path.resolve(route))(app);
  });
};

/**
* @function loadErrorRoutes
* @summary Configure 500 and 404 error routes
* @param {Express.app} app
*/
const loadErrorRoutes = function loadErrorRoutes (app) {
  // If no error is present, then there is probably a 404 error and this may be an unexpected server error
  app.use((err, req, res, next) => {
    if (!err) return next();
    // Log the error and respond with 500
    logger.error('Unexpected server error', err.stack);
    res.status(500).json({ status: 500, type: 'server-error', message: 'Unexpected server error' });
  });
  // Nothing has responded so this is assumed to be a 404 error
  app.use((req, res) => {
    logger.error('The requested resource was not found', req.path);
    res.status(404).json({ status: 404, type: 'not-found', message: 'The requested resource was not found' });
  });
};

module.exports.init = function init (db) {
  logger.info('Initializing Express');
  var app = express();
  // Setup valid server routes
  loadServerRoutes(app);
  // Setup error routes
  loadErrorRoutes(app);

  return app;
};
