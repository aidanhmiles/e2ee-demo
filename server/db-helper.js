/* DB helper
 *
 * This file exposes instances of Umzug (the sequelize migration helper)
 * to facilitate DB seeding / migration
 */

'use strict';

const NODE_ENV = process.env.NODE_ENV;
if (!NODE_ENV){
  throw new Error("NODE_ENV is expected to be set already");
}
const Umzug = require('umzug');
const path = require('path');

const logger = require('./logger');

const models = require('./models');
const sequelize = models.sequelize;

// config for using Umzug for migrations
var migratorConfig = {
  storage: 'sequelize',
  storageOptions: {
    sequelize: sequelize
  },
  logging: function(msg) {
    logger.log(msg);
  },
  migrations: {
    path: path.resolve('./db/migrations'),
    wrap: function(migrationFn) {
      return function() {
        return migrationFn(sequelize.queryInterface, sequelize.Sequelize);
      };
    }
  }
};

// config for using Umzug for DB seeding
const seederConfig = {
  storage: 'sequelize',
  storageOptions: {
    sequelize: sequelize
  },
  logging: function(msg) {
    logger.log(msg);
  },
  migrations: {
    path: path.resolve('./db/seeds'),
    // only run the seed for the current environment
    pattern: new RegExp('^(.*)' + NODE_ENV + '.js$'),
    wrap: function(migrationFn) {
      return function() {
        return migrationFn(models);
      };
    }
  }
};

function tryConnect(){
  let p = new Promise(function(res, rej){
    retryPromise(res, rej, null, 10);
  });
  return p;
}

function retryPromise(resolve, reject, context, maxTries) {
  // return promise.call(context)
  sequelize.authenticate()
  .then(function(d){
    logger.log('DB CONNECTED');
    resolve();
  },
  function(err){
    if (maxTries < 0){
      logger.log('Umzug reached max tries to connect. FAIL.');
      reject(err);
    }
    else {
      setTimeout(function(){
        logger.log('not connected to DB, trying again in 2 seconds');
        retryPromise(resolve, reject, context, maxTries - 1);
      }, 2000)
    }
  });
}

const seeder = new Umzug(seederConfig);
const migrator = new Umzug(migratorConfig);

// expose one instance of Umzug for both migrator and seeder.
// this means we have migrator.up().then...
// as well as seeder.up().then...
module.exports = {
  migrator,
  seeder,
  tryConnect
};
