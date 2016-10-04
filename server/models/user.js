
const authService = require('../auth.service.js');
const _ = require('lodash');
const Promise = require('bluebird');
const logger = require('../logger');

module.exports = function(sequelize, DataTypes){

  return sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    password: DataTypes.STRING,
    passwordDigest: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    // handle the hashing of users' passwords here
    hooks: {
      // used in seedfile
      beforeBulkCreate: function(instances, options) {
        // hash each instance's password
        return Promise.map(instances, (inst) => {
          return authService.derivePassword(inst.password)
            .then((digest) => {
              inst.passwordDigest = digest;
              delete inst.password;
            });
        });
      },
      // before single create
      beforeValidate: function(instance){
        return authService.derivePassword(instance.password)
          .then((digest) => {
            instance.passwordDigest = digest;
            // don't actually store the password
            instance.password = null;
          });
        ;
      }
    }
  });

}
