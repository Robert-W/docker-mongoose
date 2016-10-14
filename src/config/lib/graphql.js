const graphqlHTTP = require('express-graphql');
const graphql = require('graphql');
const express = require('express');
const path = require('path');
const logger = require(path.resolve('./config/lib/winston'));

// Sample for now, move these to the user folder eventually and use globs to load and configure this info
const people = require('./data.json');
const UserType = new graphql.GraphQLObjectType({
  name: 'User',
  description: 'User type for querying Mongoose user model',
  fields: () => {
    return {
      firstName: { type: graphql.GraphQLString },
      lastName: { type: graphql.GraphQLString },
      username: { type: graphql.GraphQLString },
      email: { type: graphql.GraphQLString },
      id: { type: graphql.GraphQLString }
    };
  }
});

const QueryType = new graphql.GraphQLObjectType({
  name: 'Query',
  description: 'User Queries',
  fields: {
    user: {
      type: UserType,
      args: {
        id: { type: graphql.GraphQLString }
      },
      resolve: (root, args) => {
        return people[args.id];
      }
    }
  }
});

module.exports.init = function init (db) {
  logger.info('Initializing GraphQL');
  var app = express();

  // Set up root endpoint for graphql server
  app.use('/', graphqlHTTP({
    graphiql: true,
    schema: new graphql.GraphQLSchema({
      query: QueryType
    })
  }));

  return app;
};
