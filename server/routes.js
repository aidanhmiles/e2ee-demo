
// make a new router
const router = require('express').Router();
const _ = require('lodash');

// load Sequelize models
const models = require('./models'); 
const authService = require('./auth.service'); 
const logger = require('./logger');

const publicUserProperties = ['username', 'id']

// Route - /api/auth
// existing users submit username and password
// if valid credentials, users receive an API token
router.post('/auth', authHandler);

// Route - /api/register
// new users submit username and password, receive an API token
router.post('/register', registerHandler);

module.exports = router; 

//
// handler functions
//
function authHandler(req, res){

  if (!req.body.username || !req.body.password){
    res.unprocessable('Username and password both required');
    return;
  } 

  // cache user data here for access across the following promises
  let userData;

  models.User.findOne({where: { username: req.body.username}})
  .then(function(user){
    if (!user){
      let msg = 'No such user';
      res.notFound(msg);
      return Promise.reject('skipme');
    }
    else {
      userData = user.get();
      console.log(userData.passwordDigest, userData.username);
      logger.log('calling challengePassword');
      logger.log(user.passwordDigest);
      return authService.challengePassword(req.body.password, user.passwordDigest);
    }
  })
  .then(function(isCorrectPw){
    if (!isCorrectPw){ 
      let msg = 'Incorrect credentials';
      res.unauthorized(msg);
      return Promise.reject('skipme');
    }
    return authService.signPayload(_.pick(userData, publicUserProperties))
  })
  .then(function(token) {
    res.ok({
      token: token,
      user: _.pick(userData, publicUserProperties)
    });
  })
  .catch(function(err){
    if (err === 'skipme'){
      return;
    }
    // all other rejections or errors can be displayed
    console.log(err);
    res.serverError(err);
  });
}

function registerHandler(req, res){

  if (!req.body.username || !req.body.password){
    res.unprocessable('Username and password both required');
    return;
  }

  let userData;

  models.User.findOne({where: { username: req.body.username}})
  .then(function(user){
    // we're expecting this user to not exist
    if (!user){
      // only take username and password, discard other fields
      return models.User.create(
        _.pick(req.body, ['username', 'password'])
      );
    }
    else {
      res.unprocessable('Username taken');
      return Promise.reject('skipme');
    }
  })
  .then(function(user){
    userData = user.get();
    // give the new user an API token
    return authService.signPayload(_.pick(userData, publicUserProperties))
  })
  .then(function(token) {
    res.ok({
      token: token,
      user: _.pick(userData, publicUserProperties)
    });
  }).catch(function(err){
    if (err === 'skipme'){
      return;
    }
    console.log(err);
    res.serverError(err);
  });
}

