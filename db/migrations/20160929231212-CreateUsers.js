'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('Users',
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        username: Sequelize.STRING,
        passwordDigest: Sequelize.STRING,
        password: Sequelize.STRING,
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE
      });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('Users');
  }
};
