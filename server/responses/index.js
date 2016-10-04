
/* custom response helpers
 * Each module in this directory is a response handler, which has
 * a name, and a function associated with it. The function is called
 * in a context with Express's `req` and `res` objects bound to `this`.
 * 
 */


'use strict';
module.exports = (function(_, fs, path){
  var basename  = path.basename(module.filename);
  var responses = [];

  fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(function(file) {
    // export of each module is a function
    var helperObj = require(path.join(__dirname, file));
    responses.push(helperObj);
  });

  return responses;
})(
  require('lodash'),
  require('fs'),
  require('path')
);
