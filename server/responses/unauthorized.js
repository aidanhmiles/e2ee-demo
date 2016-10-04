'use strict';
module.exports = (function(){
  return {
    name: 'unauthorized',
    fn: function unauthorized(message){
      message = message || "Unauthorized request";
      this.res.status(401).send(message);
    }
  }
})();
