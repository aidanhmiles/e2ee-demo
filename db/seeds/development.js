'use strict';

module.exports = (function(){
  return {
    up: function (models) {
      return models.User.bulkCreate([
        {
          username: 'itsthejazzkid',
          password: 'asdfasdfasdf'
        },
        { 
          username: 'aaronrobin',
          password: 'ASDFasdf1234'
        }
      ]);
    },

    down: function (models) {
      var queryInterface = models.sequelize.queryInterface;
      return Promise.all([
        queryInterface.query('TRUNCATE TABLE users')
      ]);
    }
  };
})(
);
