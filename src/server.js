const mongoose = require('./config/lib/mongoose');
const express = require('./config/lib/express');
const logger = require('./config/lib/winston');
const config = require('./config/config');

logger.info('Initializing Node server');

mongoose.connect().then(connection => {
  logger.info('Mongoose connected');
  // Initialize express
  return express.init(connection);
}, mongooseErr => {
  process.exit(mongooseErr);
}).then(app => {
  // Start the app on the configured port
  app.listen(config.port);
  // Initializing complete
  logger.info('App listening on port', config.port);
}, expressErr => {
  process.exit(expressErr);
});
