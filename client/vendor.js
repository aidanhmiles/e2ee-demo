// manifest of vendor js libs


// polyfills
import 'reflect-metadata';
import 'core-js/es7/reflect';
import 'core-js/es6';
require('zone.js/dist/zone');

// only in development
require('zone.js/dist/long-stack-trace-zone');

// the rest
import '@angular/platform-browser';
import '@angular/platform-browser-dynamic';
import '@angular/core';
import '@angular/common';
import '@angular/http';
import '@angular/router';
import 'angular2-jwt';

require('socket.io-client');

require('script!js-nacl/lib/nacl_factory');

require('bcryptjs');
