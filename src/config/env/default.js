/**
* @name exports
* @static
* @summary Default environment configurations
*/
module.exports = {

  port: process.env.PORT || 3000,

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
  }

};
