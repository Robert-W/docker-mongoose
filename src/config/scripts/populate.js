const path = require('path');
const mongoose = require(path.resolve('./config/lib/mongoose'));
const logger = require(path.resolve('./config/lib/winston'));
const config = require(path.resolve('./config/config'));

if (!config.files.scripts || config.files.scripts.length === 0) {
  logger.info('No populate scripts present');
  process.exit(0);
}

mongoose.connect().then(() => {
  logger.info('Loading all database scripts');
  // Load all the database scripts and populate all the collections with their defaults
  const promises = config.files.scripts.map((file) => {
    const script = require(path.resolve(file));
    if (!script.populateCollection) {
      logger.error('Script missing populateCollection function');
      process.exit(0);
    }
    return script.populateCollection();
  });
  // Log the result
  Promise.all(promises).then(() => {
    logger.info('Successfully populated all collections');
    process.exit(0);
  }).catch(err => {
    logger.error('Unable to populate all collections', err);
    process.exit(err);
  });
}).catch(err => {
  logger.error('Could not connect to Mongo', err);
  process.exit(err);
});
