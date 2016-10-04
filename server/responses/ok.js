'use strict';
module.exports = (function(){
  return {
    name: 'ok',
    fn: function ok(data){
      data = data || {};
      this.res.status(200).json(data);
    }
  }
})();
