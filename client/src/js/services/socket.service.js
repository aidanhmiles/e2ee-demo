import { Injectable } from '@angular/core';

import { AuthService } from './auth.service';
import { CryptoService } from './crypto.service';

const io = require('socket.io-client');
// var socket = io.connect('http://' + document.domain + ':' + location.port);

@Injectable()
export class SocketService {

  constructor(auth: AuthService, crypto: CryptoService) {
    let self = this;

    self.auth = auth;
    self.crypto = crypto;

    const socket = io.connect(env.API_ENDPOINT);


    socket.on('connect', function() {
      socket
        .emit('authenticate', { token: auth.getToken() }) // send the jwt
        .on('authenticated', function() {
          // do other things
          self.crypto.ensureKeypair();
          socket.emit('pk', {
            // send public key for others to use
            // must be as hexadecimal because byte arrays
            // don't get preserved correctly when sent over the wire
            publicKeyHex: self.crypto.getPublicKeyHex()
          });
        })
        // in case of invalid JWT...
        .on('unauthorized', function(msg) {
          console.log('unauthorized: ' + JSON.stringify(msg.data));
          throw new Error(msg.data.type);
        });
    });

    socket.on('direct message', (msg) => {
      debugger;
      console.log(msg);
      // this.crypto.cryptoBoxOpen(msg);
    });

    window.socket = socket;
    self.socket = socket;
  }

  join(room) {
  }

  startConversation(id) {
  }

  sendMessageTo(userObj, message) {
    let secretMessage = this.crypto.cryptoBox(
      message,
      this.crypto.fromHex(userObj.publicKeyHex)
    );
    this.socket.emit('direct message', userObj, secretMessage);
  }

  init(socket) {
  }
}
