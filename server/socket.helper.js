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
    let publicProfile = {
      id: newSocket.id, 
    };

    _.extend(publicProfile, newSocket.decoded_token);

    // tell the new socket who's online
    newSocket.emit('online users', onlineUsers);

    // wait for client to send their public key
    // must be as hexadecimal because byte arrays
    // don't get preserved correctly when sent over the wire
    newSocket.on('pk', (data) => {
      publicProfile.publicKeyHex = data.publicKeyHex;
      addOnlineUser(publicProfile);
      // tell everyone else that this socket has arrived
      io.emit('online users', onlineUsers);
    });

    // when the socket sends a direct message to a user
    newSocket.on('direct message', function(userObj, msg){
      logger.log(userObj, msg);
      newSocket.broadcast.to(userObj.id).emit('direct message', userObj, msg);
    });

    // on disconnect
    newSocket.on('disconnect', function(){
      // remove the socket ID from currentUsers
      let disconnectedUser = removeOnlineUser(newSocket.id);
      if (disconnectedUser) {
        console.log(`User ${disconnectedUser.username} left`);
      }
      io.emit('online users', onlineUsers);

    });
  }

  function addOnlineUser(profileData) {
      onlineUsers.push(profileData);
      console.log(`User ${profileData.username} joined`);
  }

  function removeOnlineUser(socketId) {
    let user = onlineUsers.splice(
        _.findIndex(onlineUsers, ['id'], socketId),
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

