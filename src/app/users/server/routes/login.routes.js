const path = require('path');
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
  app.get('/', (req, res) => {
    res.render('login', {
      loginjs: config.assets.login
    });
  });
};
