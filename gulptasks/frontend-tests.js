// this file deals with frontend tests.
//
//
// - - - - project modules
// var paths = require('../paths.js');
// var opts = require('./cli_opts');

// - - - - NPM MODULES
// var gulp = require('gulp');
// var karma = require('karma');
// var gutil = require('gulp-util');
// var path = require('path');
// var karmaParseConfig = require('karma/lib/config').parseConfig;

// function runKarma(configFilePath, options, cb) {

// 	configFilePath = path.resolve(configFilePath);

// 	var server = karma.server;
// 	var log=gutil.log, colors=gutil.colors;
// 	var config = karmaParseConfig(configFilePath, {});

//   Object.keys(options).forEach(function(key) {
//     config[key] = options[key];
//   });

// 	server.start(config, function(exitCode) {
// 		log('Karma has exited with ' + colors.red(exitCode));
// 		cb();
// 		process.exit(exitCode);
// 	});
// };

// /** actual tasks */

// /** single run */
// gulp.task('test', function(cb) {
// 	runKarma('./gulp-tasks/karma.conf.js', {
// 		autoWatch: false,
// 		singleRun: true
// 	}, cb);
// });

// /** continuous ... using karma to watch (feel free to circumvent that;) */
// gulp.task('test-dev', function(cb) {
// 	runKarma('./gulp-tasks/karma.conf.js', {
// 		autoWatch: true,
// 		singleRun: false
// 	}, cb);
// });
//
