/**
* @name exports
* @static
* @summary Development environment configurations
*/
module.exports = {

  port: process.env.PORT || 3000,

  app: {
    title: 'Development'
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
