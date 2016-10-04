
/* Gulpfile
 * - exposes tasks to the command line
 * - most task functions are in ./gulp_helpers/gulp_tasks.js

/* CONTENTS
 * - default task (at the bottom, because Gulp 4)
 */

// - - - - NPM MODULES
var gulp = require('gulp');
var fs = require('fs');
var path = require('path');
var _    = require('lodash');

// - - - - project modules
// var paths = require('./paths');

// this pattern taken from Sequelize, in server/api/models/index.js
// it loads all *other* files in gulptasks/ and extends the helper object with any
// exposed properties / methods. 
// any tasks declared with gulp.task('name', fn) will also be made available by
// requiring those files

var helper = {};
fs.readdirSync(__dirname)
  .filter(function(file) {
    // don't pull from files which are without a .js extension, or are this gulpfile.js
    return (file.indexOf('.') !== 0) && (file !== module.filename) && (file.slice(-3) === '.js');
  })
  .forEach(function(file) {
    var module = require(path.join(__dirname, file));
    _.merge(helper, module);
  });


/* - - - - - - - - default task - - - - - - - - - */
// gulp.task('default', gulp.series(helpers.eslint, helpers.assets, helpers.sass, /*'test-dev',*/ 'js', helpers.index, 'browserSync', 'watch'));
// gulp.task('default', );

gulp.task('build', helper.runWebpack);

// for working on the server
gulp.task('dev:client', gulp.series(helper.runWebpackDevServer));
gulp.task('default',    gulp.series(helper.runWebpackDevServer));

