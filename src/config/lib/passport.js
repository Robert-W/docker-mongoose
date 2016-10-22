const User = require('mongoose').model('User');
const passport = require('passport');
const glob = require('glob');
const path = require('path');
const logger = require(path.resolve('./config/lib/winston'));

/**
* @function init
* @static
* @summary Initialize passport
*/
module.exports.init = function init () {
  // Serialize sessions
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // Deserialize sessions
  passport.deserializeUser((id, done) => {
    User.findOne({ _id: id }, '-salt -password', (err, user) => {
      done(err, user);
    });
  });

  // Load all strategies
  glob.sync('config/strategies/**/*.js').forEach(strategy => {
    try {
      require(path.resolve(strategy))();
    } catch (err) {
      logger.error('Could not load strategies', err);
    }
  });

};
