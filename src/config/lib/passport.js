const User = require('mongoose').model('User');
const passport = require('passport');

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

};
