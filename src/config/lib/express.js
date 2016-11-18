const methodOverride = require('method-override');
const compression = require('compression');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');
const passport = require('passport');
const express = require('express');
const helmet = require('helmet');
const path = require('path');
const webpack = require(path.resolve('./config/lib/webpack'));
const logger = require(path.resolve('./config/lib/winston'));
const config = require(path.resolve('./config/config'));

/**
* @function configureMiddleware
* @summary Configure express middleware
* @param {Express.app} app
*/
const configureMiddleware = function configureMiddleware (app) {
  // Enable stack traces
  app.set('showStackError', true);
  // Enable jsonp via res.jsonp
  app.enable('jsonp callback');
  // Use before static routes applied
  app.use(compression({ level: 9 }));
  // Setup favicon
  app.use(favicon('./app/shared/favicon.ico'));
  // Setup body parser
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  // Setup methodOverride so I can use put and delete
  app.use(methodOverride());
  // If were in development mode, add some webpack middleware
  if (process.env.NODE_ENV === 'development') {
    const {devMiddleware, hotMiddleware} = webpack.watchAndGetMiddleware();
    app.use(devMiddleware);
    app.use(hotMiddleware);
  }
};

/**
* @function configureLocalVariables
* @summary Configure local variables
* @param {Express.app} app
*/
const configureLocalVariables = function configureLocalVariables (app) {
  app.locals.title = 'Robert-W Rocks';
  app.locals.author = 'Robert-W';
  app.locals.keywords = 'Express, Pug, GraphQL, Mongo, Mongoose, Docker';
  app.locals.description = 'A quick start setup for a docker based developer environment for an application using MongoDB, Mongoose, and GraphQL.';
};

/**
* @function configureViewEngine
* @summary Configure view engine
* @param {Express.app} app
*/
const configureViewEngine = function configureViewEngine (app) {
  // Set the engine and the view paths
  app.set('view engine', 'pug');
  app.set('views', config.files.views);
};

/**
* @function configureSession
* @summary Configure express session
* @param {Express.app} app
*/
const configureSession = function configureSession (app, connection) {
  app.set('trust proxy', config.auth.trustProxy);
  app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: config.auth.secret,
    cookie: config.auth.cookie,
    store: new MongoStore({
      mongooseConnection: connection,
      collection: config.auth.collection
    })
  }));
};

/**
* @function configurePassport
* @summary Configure passport authentication
* @param {Express.app} app
*/
const configurePassport = function configurePassport (app) {
  app.use(passport.initialize());
  app.use(passport.session());
  // Init my passport lib
  require(path.resolve('./config/lib/passport')).init();
};

/**
* @function setHelmetHeaders
* @summary Configure hemlet to secure express headers
* @param {Express.app} app
*/
const configureHelmetHeaders = function configureHelmetHeaders (app) {
  /**
  * Default middleware used is:
  * dnsPrefetchControl - controls browser DNS prefetching
  * frameguard - to prevent clickjacking
  * hidePoweredBy - to remove the X-Powered-By header
  * hsts - for HTTP Strict Transport Security
  * ieNoOpen - sets X-Download-Options for IE8+
  * noSniff - to keep clients from sniffing the MIME type
  * xssFilter - adds some small XSS protections
  */
  app.use(helmet({
    hsts: false // off until https us working
  }));
  /**
  * TODO: Add content security policy configuration via helmet.contentSecurityPolicy({ ... })
  * @see https://github.com/helmetjs/helmet
  */
};

/**
* @function configureStaticAssetPath
* @summary Configure static assets
* @param {Express.app} app
*/
const configureStaticAssetPath = function configureStaticAssetPath (app) {
  app.use(express.static('public'));
};

/**
* @function loadServerRoutes
* @summary Configure valid express server routes
* @param {Express.app} app
*/
const loadServerRoutes = function loadServerRoutes (app) {
  config.files.routes.forEach(route => {
    require(path.resolve(route))(app);
  });
};

/**
* @function loadErrorRoutes
* @summary Configure 500 and 404 error routes
* @param {Express.app} app
*/
const loadErrorRoutes = function loadErrorRoutes (app) {
  // If no error is present, then there is probably a 404 error and this may be an unexpected server error
  app.use((err, req, res, next) => {
    if (!err) { return next(); }
    // Log the error and respond with 500
    logger.error('Unexpected server error', err.stack);
    res.status(500).render('500', { status: 500, type: 'server-error', message: 'Unexpected server error' });
  });
  // Nothing has responded so this is assumed to be a 404 error
  app.use((req, res) => {
    logger.error('The requested resource was not found', req.path);
    res.status(404).render('404', { status: 404, type: 'not-found', message: 'The requested resource was not found' });
  });
};

/**
* @function generateStaticAssets
* @summary Generate all javascript and css assets for production which also updates the asset map
* @return {Promise}
*/
const generateStaticAssets = function generateStaticAssets () {
  return webpack.build();
};

module.exports.init = function init (connection) {
  logger.info('Initializing Express');
  return new Promise((resolve, reject) => {
    var app = express();
    // Configure express middleware
    configureMiddleware(app);
    // Configure local variables
    configureLocalVariables(app);
    // Configure view engine
    configureViewEngine(app);
    // Configure express session
    configureSession(app, connection);
    // Configure passport authentication
    configurePassport(app);
    // Configure helmet security headers
    configureHelmetHeaders(app);
    // Configure static asset path
    configureStaticAssetPath(app);
    // Setup valid server routes
    loadServerRoutes(app);
    // Setup error routes
    loadErrorRoutes(app);
    // Generate static assets if production
    if (process.env.NODE_ENV === 'production') {
      generateStaticAssets().then(() => {
        resolve(app);
      }, reject).catch(reject);
    } else {
      resolve(app);
    }
  });
};
