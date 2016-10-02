/**
* @name exports
* @static
* @summary Production environment configurations
*/
module.exports = {

  port: process.env.PORT || 3000,

  app: {
    title: 'Production'
  },

  mongo: {
    db: 'mongodb://localhost/docker-test',
    admin: {
      username: 'admin',
      password: 'P@ssword'
    }
  },

  passwordRequirements: {

  }

};
