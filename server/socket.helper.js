'use strict';

module.exports = (function(socket, socketioJwt, logger, config){
  let io;
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

    let publicProfile = {
      id: newSocket.id, 
      token: newSocket.decoded_token
    };

    // send these messages to everyone
    newSocket.on('test message', (msg) => {
      logger.log(msg)
      io.emit('test message', msg);
    });

    newSocket.on('direct message', function(id, msg){
      newSocket.broadcast.to(id).emit('test message', msg);
    });

    // tell everyone else that this socket has arrived
    newSocket.broadcast.emit('new user', publicProfile);

    // on disconnect
    newSocket.on('disconnect', function(){
      // remove the socket ID from currentUsers
      io.emit('user disconnected', newSocket.id);
    });
  }

})(
  require('socket.io'),
  require('socketio-jwt'),
  require('./logger'),
  require('./config')
);

