/**
* @name exports
* @static
* @summary Default environment configurations
*/
module.exports = {

  port: 3000,

  app: {
    author: 'Robert-W',
    title: 'Docker-Mongoose',
    keywords: 'Express, Pug, GraphQL, Mongo, Mongoose, Docker',
    description: 'A quick start setup for a docker based developer environment for an application using MongoDB, Mongoose, and GraphQL.'
  },

  mongo: {
    db: 'mongodb://mongo/docker-mongoose',
    admin: {
      username: process.env.MONGO_ADMIN_USERNAME,
      password: process.env.MONGO_ADMIN_PASSWORD
    }
  },

  passwordRequirements: {
    length: 8,
    rules: [
      { regex: /[A-Z]/, description: 'Uppercase letter' },
      { regex: /[a-z]/, description: 'Lowercase letter' },
      { regex: /[0-9]/, description: 'Number' },
      { regex: /\W/, description: 'Symbol' }
    ]
  },

  adminUser: {
    username: 'admin',
    password: 'Adm1nP@$$'
  },

  auth: {
    strategy: 'local',
    collection: 'sessions',
    secret: 'Kitten Hooligan',
    cookie: {
      maxAge: 1000 * 60 * 60 * 24
    }
  }

};
