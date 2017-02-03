const path = require('path');
const controller = require('../controllers/home.controller');
const utils = require(path.resolve('./config/utilities'));
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
  app.get('/home', utils.ensureAuthenticated, controller.home);
};
