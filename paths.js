/**
  * This file serves as a catalog of all files in the project.
  * Paths to individual files as well as common patterns used in automated 
  * build processes are listed here.
  *
  *
  * All paths are declared as variables, so that we can combine / manipulate
  * them and attach them to the exported object.
  *
  * 
  * As a convention, all references to directories end in a forward-slash, 
  * so that concatenating pathString + fileNameString works consistently
  *
  * Most of the paths object corresponds to the actual hierarchy in the filesystem
**/

// MODULES
var path = require('path');

/* * * * * * * * * * * * * * * * * * * * * * * * * */
/* * * * * * * * * EXPOSED API  * * * * * * * * * */
/* * * * * * * * * * * * * * * * * * * * * * * * */

function pathsAPI(){
  return {
    root: root,
    config: {
      projectName: projectName
    },
    src: {
      // files required for web app 
      client: {
        dir: clientDir,
        webpackEntryFile: jsDir + 'bootstrap.js',
        vendorManifest: clientDir + 'vendor.js',
        js: jsDir + '**/*.js',
        jsDir: jsDir,
        // es6: jsDir + '**/*.es6',
        templates: templatesDir + '**/*.html',
        scss: scssDir + '**/*.scss',
        karma: '', // all files required for karma
        assets: {
          fonts: '' + 'fonts/*',
          images: '' + 'images/*'
        }
      }
    },
    dist: {
      dir: buildDir,
      indexFile: buildDir + 'index.html',
      names: ''
    }
  };
}

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/* * * * * * * * * * * * * * * * * * VARS * * * * * * * * * */
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

var projectName = 'e2ee-demo';

/* - - - -  primary dir variables - - - - */
var root = path.resolve(__dirname) + '/',
    clientDir = root + 'client/',

    assetsDir = clientDir + 'assets/',
    buildDir = clientDir + 'dist/',
    srcDir = clientDir + 'src/',

    jsDir = srcDir + 'js/',
    scssDir = srcDir + 'scss/',
    templatesDir = srcDir + 'templates/';

/* - - - package managers - - - */
var packageJSON = root + 'package.json', 
    nodeModulesDir = root + 'node_modules/';

module.exports = pathsAPI();

