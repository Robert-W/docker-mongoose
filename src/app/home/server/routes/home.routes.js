const path = require('path');
const config = require(path.resolve('./config/config'));
/**
* @name exports
* @static
* @summary Routes for working with user models and schemas
*/
module.exports = function (app) {
  /**
  * @name /user
  * @summary GraphQL Endpoint for user information
  * @see users.schema
  * @memberof Router
  */
  app.get('/', (req, res) => {
    res.render('home', {
      homeBundle: config.assets.home
    });
  });
};
