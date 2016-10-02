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
      username: process.env.MONGO_ADMIN_USERNAME,
      password: process.env.MONGO_ADMIN_PASSWORD
    }
  },

  passwordRequirements: {

  }

};
