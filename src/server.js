const mongoose = require('./config/lib/mongoose');
const express = require('./config/lib/express');
const logger = require('./config/lib/winston');
const config = require('./config/config');

logger.info('Initializing Node server');

mongoose.connect().then(connection => {
  logger.info('Mongoose connected');
  // Initialize express
  const app = express.init(connection);
  // Start the app on the configured port
  app.listen(config.port);
  // Initializing complete
  logger.info('App listening on port', config.port);
}).catch(function () {
  process.exit(1);
});

