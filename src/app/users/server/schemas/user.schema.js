const people = require('../data.json'); // Temp until mongoose and mongo are up and running with user models
const graphql = require('graphql');

const UserType = new graphql.GraphQLObjectType({
  name: 'User',
  description: 'User type for querying Mongoose user model',
  fields: () => {
    return {
      firstName: { type: graphql.GraphQLString },
      lastName: { type: graphql.GraphQLString },
      username: { type: graphql.GraphQLString },
      email: { type: graphql.GraphQLString },
      _id: { type: graphql.GraphQLString }
    };
  }
});

const UserQueryType = new graphql.GraphQLObjectType({
  name: 'UserQuery',
  description: 'User Queries',
  fields: {
    user: {
      type: UserType,
      args: {
        _id: { type: graphql.GraphQLString }
      },
      resolve: (root, args) => {
        return people[args._id];
      }
    }
  }
});

exports.UserQuerySchema = new graphql.GraphQLSchema({
  query: UserQueryType
});
