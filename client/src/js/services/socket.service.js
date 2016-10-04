import { Injectable } from '@angular/core';

import { AuthService } from './auth.service';

const io = require('socket.io-client');
// var socket = io.connect('http://' + document.domain + ':' + location.port);

@Injectable()
export class SocketService {

  constructor(auth: AuthService) {
    let self = this;

    self.auth = auth;

    self.socket = io.connect(env.API_ENDPOINT);
    self.socket.on('connect', function() {
      self.socket
        .emit('authenticate', { token: auth.getToken() }) // send the jwt
        .on('authenticated', function() {
          // do other things
        })
        .on('unauthorized', function(msg) {
          console.log('unauthorized: ' + JSON.stringify(msg.data));
          throw new Error(msg.data.type);
        });
    });

    self.socket.on('test message', (msg) => {
      console.log(msg);
    });

    // self.socket.on('userlist', (msg) => {
    //   console.log(msg);
    // });
  }

  join(room) {
  }

  startConversation(id) {
  }

  init(socket) {
  }
}
