const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports = function () {
  passport.use(new LocalStrategy((username, password, done) => {
    // Find our user and validte them
    User.findOne({ username: username }, (err, user) => {
      // System error
      if (err) {
        return done(err);
      }
      // Invalid username or password
      if (!user || !user.authenticate(password)) {
        return done(null, false, { message: 'Incorrect username/password' });
      }
      // There good
      return done(null, user);
    });
  }));
};
