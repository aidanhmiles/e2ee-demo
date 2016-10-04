'use strict';
module.exports = (function(config, bcrypt, jwt, _){

  const Promise = require('bluebird');
  const logger = require('./logger');

  return {

    derivePassword : function(password) {
      let saltRounds = 10;
      return new Promise((resolve, reject) => {
        bcrypt.hash(password, saltRounds, function(err, hash) {
          if (err) reject(err);
          resolve(hash);
        });
      });
    },

    challengePassword : function(password, hash) {
      return new Promise((resolve, reject) => {
        bcrypt.compare(password, hash, function(err, res) {
          if (err) reject(err);
          // res is true or false
          resolve(res);
        });
      });
    },

    signPayload : function(payload){
      let opts = {
        expiresIn: '8h'
      };

      return new Promise(function(resolve, reject){
        jwt.sign(payload, config.SUPER_SECRET, opts, function(err, token){
          if (err) { 
            reject(err); 
          }
          else {
            resolve(token);
          }
        });
      });
    },

    verifyToken : function(token, options){
      options = options || {};
      token = token.indexOf('Bearer ') > -1 ? token.split(' ')[1] : token;
      return new Promise(function(resolve, reject){
        jwt.verify(token, config.SUPER_SECRET, options, function(err, decoded){
          err ? 
            reject(err) : 
            resolve(decoded);
        });
      });
    }

  };
})(
  require('./config'),
  require('bcryptjs'),
  require('jsonwebtoken'),
  require('lodash')
);
