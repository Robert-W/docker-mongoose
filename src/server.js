const mongoose = require('./config/lib/mongoose');
const express = require('./config/lib/express');
const logger = require('./config/lib/bunyan');
const config = require('./config/config');

logger.info('Initializing Node server');

mongoose.connect().then(function (db) {
  logger.info('Mongoose connected, continuing with application setup');
  // Initialize express
  const app = express.init(db);
  // Start the app on the configured port
  app.listen(config.port);
  // Initializing complete
  logger.info('App listeneing on port', config.port);
}).catch(function () {
  process.exit(1);
});
