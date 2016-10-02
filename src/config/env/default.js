/**
* @name exports
* @static
* @summary Default environment configurations
*/
module.exports = {

  port: process.env.PORT || 3000,

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
