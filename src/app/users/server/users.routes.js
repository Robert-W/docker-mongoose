const graphqlHTTP = require('express-graphql');
const schemas = require('./users.schema');
const graphql = require('graphql');

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
  app.use('/user', graphqlHTTP({
    graphiql: true,
    schema: schemas.UserQuerySchema
  }));
};
