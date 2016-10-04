
module.exports = {
  lintClient
};


// - - - - project modules
var paths = require('../paths.js');
var opts = require('./cli_opts');

// - - - - NPM MODULES
var gulp = require('gulp');
var path = require('path');
var $ = require('gulp-load-plugins')({ lazy: true });

gulp.task('lint-client', lintClient);

function lintClient(){
  return gulp.src(paths.src.client.js)
    .pipe(opts.isListFiles ? $.debug() : $.util.noop())
    .pipe($.eslint({
        configFile: 'gulptasks/eslintrc.yaml',
        fix: true
    }))
    .pipe($.eslint.format());
}
