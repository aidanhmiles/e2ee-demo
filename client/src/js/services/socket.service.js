import { Injectable } from '@angular/core';

import { AuthService } from './auth.service';
import { CryptoService } from './crypto.service';

const io = require('socket.io-client');
// var socket = io.connect('http://' + document.domain + ':' + location.port);

@Injectable()
export class SocketService {

  constructor(auth: AuthService, crypto: CryptoService) {
    let self = this;
    const socket = io.connect(env.API_ENDPOINT);

    self.auth = auth;
    self.crypto = crypto;
    self.socket = socket;


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

    socket.on('direct message', (cryptoBoxHex, nonceHex, sender) => {
      let decoded = this.crypto.cryptoBoxOpen(
        cryptoBoxHex,
        nonceHex,
        sender.publicKeyHex
      );

    });
  }

  join(room) {
  }

  startConversation(id) {
  }

  sendMessageTo(userObj, message) {
    // destructure the output of cryptoBox
    let [secretMessage, nonce] = this.crypto.cryptoBox(
      message,
      userObj.publicKeyHex
    );

    this.socket.emit('direct message',
      this.crypto.toHex(secretMessage),
      this.crypto.toHex(nonce),
      userObj
    );
  }

}
