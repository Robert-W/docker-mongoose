const controller = require('../controllers/login.controller');
/**
* @name exports
* @static
* @summary Login route
*/
module.exports = function (app) {
  /**
  * @name /login
  * @see login.controller
  * @memberof Router
  */
  app.get('/', controller.login);
};
