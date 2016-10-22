// Set the env to test before requiring the config file
process.env.NODE_ENV = 'test';
const mongoose = require('./lib/mongoose');
const logger = require('./lib/winston');
const config = require('./config.js');
const Mocha = require('mocha');
const path = require('path');

const mocha = new Mocha({
  ui: 'bdd',
  reporter: 'list',
  useColors: true
});

// Add all globbed test files
config.files.tests.forEach(file => mocha.addFile(path.resolve(file)));

// Connect to mongo
mongoose.connect().then(() => {
  // Run all tests added
  mocha.run(process.exit);
}).catch(err => {
  logger.error('Unable to connect to mongo', err);
});
