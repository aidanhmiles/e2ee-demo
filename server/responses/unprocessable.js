'use strict';
module.exports = (function(){
  return {
    name: 'unprocessable',
    fn: function unprocessableEntity(message){
      message = message || "Unprocessable entity";
      this.res.status(422).send(message);
    }
  }
})();
