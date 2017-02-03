const path = require('path');
const config = require(path.resolve('./config/config'));

/**
* @function home
* @summary
* @name exports.home
* @static
* @param {User} user
* @param {Response} res - Express response object
*/
exports.home = function home (req, res) {
  res.render('home', {
    homejs: config.assets.home
  });
};
