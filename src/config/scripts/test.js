// Set the env to test before requiring the config file
process.env.NODE_ENV = 'test';
const Mocha = require('mocha');
const path = require('path');
const mongoose = require(path.resolve('./config/lib/mongoose'));
const logger = require(path.resolve('./config/lib/winston'));
const config = require(path.resolve('./config/config.js'));

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
