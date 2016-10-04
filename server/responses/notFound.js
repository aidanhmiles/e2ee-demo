'use strict';
module.exports = (function(){
  return {
    name: 'notFound',
    fn: function serverError(message){
      message = message || "Nothing found";
      this.res.status(404).send(message);
    }
  }
})();
