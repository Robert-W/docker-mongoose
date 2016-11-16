const webpack = require('webpack');
const path = require('path');

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
  },

  webpack: {
    devtool: 'source-map',
    debug: true,
    cache: true,
    output: {
      path: path.join(process.cwd(), 'public'),
      filename: 'js/[name].[hash].js'
    },
    plugins: [
      new webpack.NoErrorsPlugin()
    ]
  }

};
