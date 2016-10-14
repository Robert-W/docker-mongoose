const mongoose = require('./config/lib/mongoose');
const graphql = require('./config/lib/graphql');
const logger = require('./config/lib/winston');
const config = require('./config/config');

logger.info('Initializing Node server');

mongoose.connect().then(function (db) {
  logger.info('Mongoose connected');
  // Initialize express
  const app = graphql.init();
  // Start the app on the configured port
  app.listen(config.port);
  // Initializing complete
  logger.info('App listeneing on port', config.port);
}).catch(function () {
  process.exit(1);
});
