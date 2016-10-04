// 'use strict';


// require('./nodeInspector.js').start();
const express = require('express');
const app = express(); 
const server = require('http').Server(app);

const port = process.env.NODE_PORT || 8080;

const Promise = require('bluebird');

const dbHelper = require('./db-helper');

const logger = require('./logger');

// setup middleware and routes for the app
require('./middlewares')(app);

// setup socket.io 
require('./socket.helper')(server);

// try to connect to the DB
dbHelper.tryConnect() 
  .then(() => {
    // run migrations
    return dbHelper.migrator.up();
  })
  .then(() => {
    // seed the DB if applicable
    return dbHelper.seeder.up();
  })
  // start the app
  .then(startUp) 
  .catch((err) => {
    logger.log('Startup error: ' + err);
    logger.log(err);
  });

function startUp(){
  server.listen(port);

  logger.log('\n\n', new Date().toString(), '\ne2ee demo starting up'); 
  logger.log(`ENV: ${process.env.NODE_ENV}`);
  logger.log(`PORT: ${port}`);
  logger.log('\n\n');

}
