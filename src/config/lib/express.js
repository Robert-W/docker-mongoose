const express = require('express');
const path = require('path');
const logger = require(path.resolve('./config/lib/bunyan'));

module.exports.init = function init (db) {
  logger.info('Initializing Express');
  var app = express();
  // Set up routes through other methods later, this works for this example
  app.get('/', function (req, res) {
    res.end('Hello World');
  });

  return app;
};
