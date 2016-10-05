
/* This file instantiates the logger which is used throughout the backend.
 * For more info on Winston, see https://github.com/winstonjs/winston
 */


module.exports = (function(){

  var logger = require('winston');

  // winston's default log levels are
  // { error: 0, warn: 1, info: 2, verbose: 3, debug: 4, silly: 5 }

  var envLogLevels = {
    'development': 'debug',
    'dev-deploy': 'debug',
    'staging': 'debug',
    'demo': 'debug',
    'production': 'error'
  };

  logger.level = envLogLevels[process.env.NODE_ENV];

  var oldLog = logger.log;
  logger.log = function(...args){
    // if only one argument provided, it's probably the message to log
    if (args.length === 1){
      message = args[0];
      level = 'info';
    }
    oldLog(`[${new Date().toString()}]`, ...args);
  };

  return logger;
})();
