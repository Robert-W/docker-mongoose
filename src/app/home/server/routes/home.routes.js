const path = require('path');
const utils = require(path.resolve('./config/utilities'));
const config = require(path.resolve('./config/config'));
/**
* @name exports
* @static
* @summary Login route
*/
module.exports = function (app) {
  /**
  * @name /login
  * @memberof Router
  */
  app.get('/home', utils.ensureAuthenticated, (req, res) => {
    res.render('home', {
      homejs: config.assets.home
    });
  });
};
