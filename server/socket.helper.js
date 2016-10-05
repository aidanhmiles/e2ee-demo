'use strict';

module.exports = (function(socket, socketioJwt, _, logger, config){
  let io;

  let onlineUsers = [];

  // return a function which gets called with the express server as its argument
  return function(server){
    io = socket(server); 
    // set authorization for socket.io
    io.on('connection', socketioJwt.authorize({
        secret: config.SUPER_SECRET,
        timeout: 15000 // 15 seconds to send the authentication message
    }))
    .on('authenticated', handleNewSocket);
  }; 

  function handleNewSocket(newSocket) {

    // create an object with identifying information
    let userProfile = {
      socketId: newSocket.id, 
    };

    _.extend(userProfile, newSocket.decoded_token);

    let existingIndex = _.findIndex(
      onlineUsers, 
      ['username', userProfile.username]
    );

    // tell the new socket who's online
    newSocket.emit('online users', onlineUsers);

    // wait for client to send their public key
    // must be as hexadecimal strings because binary arrays
    // don't get preserved correctly when sent over the wire
    newSocket.on('pk', (hexKeyString) => {
      userProfile.publicKeyHex = hexKeyString;
      addOnlineUser(userProfile);
      // tell everyone else that this socket has arrived
      io.emit('online users', onlineUsers);
    });

    // when the socket sends a direct message to a user
    newSocket.on('direct message', function(data){

      newSocket.broadcast
        .to(data.recipientProfile.socketId)
        .emit('direct message', 
          // send everything to the recipient except for
          // information about themselves (the recipientProfile)
          _.pick(data, ['cryptoBoxHex', 'nonceHex', 'senderProfile'])
        );
    });

    // on disconnect
    newSocket.on('disconnect', function(){
      // remove the corresponding user from onlineUsers
      let disconnectedUser = removeOnlineUser(userProfile.username);

      logger.log(`User ${disconnectedUser.username} left`);
      io.emit('online users', onlineUsers);
    });
  }

  function addOnlineUser(profileData) {
    let existingIndex = _.findIndex(
      onlineUsers, 
      ['username', profileData.username]
    );
    logger.log(profileData.username, _.map(onlineUsers, 'username'));
    if (existingIndex > -1){
      logger.log('user exists, replace socketId');
      logger.log(
        profileData.username, 
        profileData.socketId, 
        onlineUsers[existingIndex].socketId
      );

      onlineUsers[existingIndex].socketId = profileData.socketId;
    }
    else {
      onlineUsers.push(profileData);
    }
    logger.log(`User ${profileData.username} joined`);
  }

  function removeOnlineUser(username) {
    let user = onlineUsers.splice(
        _.findIndex(onlineUsers, ['username', username]),
        1
      )[0]; // will only return one item, but it's wrapped in an array
    return user;
  }



})(
  require('socket.io'),
  require('socketio-jwt'),
  require('lodash'),
  require('./logger'),
  require('./config')
);

