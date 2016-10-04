'use strict';
module.exports = (function(){
  return {
    name: 'serverError',
    fn: function serverError(message){
      message = message || "Unidentifed server error";
      this.res.status(500).send(message);
    }
  }
})();
