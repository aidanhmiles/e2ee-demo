
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const jwt = require('express-jwt');
const path = require('path');

// app config
const config = require('./config');
const logger = require('./logger');

// app routes
const router = require('./routes');
const NODE_ENV = process.env.NODE_ENV;

module.exports = function(app){

  // check for NODE_ENV
  if (!NODE_ENV){
    throw new Error("NODE_ENV is expected to be set already");
  }

  // development-specific middleware
  if (NODE_ENV === 'development'){
    // this sets options for CORS
    const whitelist = ['http://localhost', 'http://localhost:8083', 'http://localhost:3000']; 
    const corsOptionsDelegate = function(req, callback){
      let corsOptions;

      if (whitelist.indexOf(req.header('Origin')) !== -1){
        corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response 
      }
      else{
        corsOptions = { origin: false }; // disable CORS for this request 
      }
      callback(null, corsOptions); // callback expects two parameters: error and options 
    };

    // allow requests from local dev server
    app.use(cors(corsOptionsDelegate));

    app.get('/', function(req, res) {
        res.sendFile(path.resolve(__dirname, '../client/dist/index.html'));
    });
    app.use(express.static(path.resolve(__dirname, '../client/dist/')));

  } // end development-specific middleware


  // parse JSON
  app.use(bodyParser.json());
  // app.use(bodyParser.urlencoded({extended:true}));

  // load some helpers for common responses
  app.use(require(path.resolve('./server/responseMiddleware.js')));

  // check for an API token on all requests to /api/*
  app.use('/api',
    jwt({
      secret: config.SUPER_SECRET,
    }).unless({
      // allow unauthenticated users to sign in and register
      // restrict everything else
      path: [
        '/api/auth',
        '/api/register'
      ]
    }),
    router
  );

  // Basic error handling, in case something doesn't get caught earlier
  app.use(function (err, req, res, next) {
    if (err){
      logger.error('Uncaught error!');
      logger.error(err);
      res.serverError(err);
    }
  });

};
