/* - - - COMMAND LINE OPTIONS - - - */

// Using yargs to parse command line options for different uses
var args = require('yargs').argv;

// Production
// - ex: gulp [command] -p || --production
var isProd = args.p || args.production;

// List all files
// pipes gulp.src through gulp-debug, where applicable
// which logs all files involved in a given task.
// Good for sanity checks
// - ex: gulp [command] -l || --listfiles
var isListFiles = args.l || args.listfiles;

// set nodeEnv here
process.env.NODE_ENV = (function setEnv(){
  // cli takes precedence
  if (args.env){
    return args.env;
  } else if (isProd){
    return 'production';
    // followed by env set in e.g. docker-compose
  } else if (process.env.NODE_ENV) {
    return process.env.NODE_ENV; 
    // and finally if nothing else, set it do development
  } else {
    return 'development';
  }

})();



module.exports = {
  isListFiles,
  isProd,
  // more direct access to args
  // for flexibility's sake
  args
};
