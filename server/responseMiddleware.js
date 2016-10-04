'use strict';
module.exports = (function(_, responses){ 

  return function customResponses(req, res, next){
    // Attach custom responses to `res` object
    // Provide access to `req` and `res` in each of their `this` contexts.
    _.forEach(responses, function(responseHelperObj){
      var name = responseHelperObj.name;
      var responseFn = responseHelperObj.fn;
      res[name] = _.bind(responseFn, {
        req: req,
        res: res
      });
    });

    // Proceed!
    return next();
  };
})(
  require('lodash'),
  require('./responses')
);

