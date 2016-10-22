/**
* @name exports
* @static
* @summary Development environment configurations
*/
module.exports = {

  port: 3000,

  mongo: {
    db: 'mongodb://mongo/docker-mongoose',
    admin: {
      username: process.env.MONGO_ADMIN_USERNAME,
      password: process.env.MONGO_ADMIN_PASSWORD
    }
  }

};
