
module.exports = {
  start: nodeInspector
}

var logger = require('./logger.js');

function nodeInspector(){
  var spawn = require('child_process').spawn; 
  logger.log('Attempting to start node inspector');

  // use globally installed node-inspector, available in the web container
  var child = spawn('node-inspector', ['--web-port=8081', '--no-preload']); 
  child.on('error', function(err){
    logger.error('Node Inspector errored out');
    logger.error(err);
  });
  child.stdout.on('data', function(data) {
    logger.info('Node Inspector stdout: ' + data);
  });
  child.stderr.on('data', function(data) {
    logger.info('Node Inspector err: ' + data);
  });
  child.on('close', function(code) {
    logger.info('Node Inspector exited: ' + code);
  });
}

