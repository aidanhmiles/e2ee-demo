import { Injectable } from '@angular/core';
import _ from 'lodash';

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
          // self.crypto.ensureKeypair();

          // send public key for others to use
          // must be as hexadecimal because byte arrays
          // don't get preserved correctly when sent over the wire
          socket.emit('pk', self.crypto.getPublicKeyHex());
        })
        // in case of invalid JWT...
        .on('unauthorized', function(msg) {
          console.log('unauthorized: ' + JSON.stringify(msg.data));
          throw new Error(msg.data.type);
        });
    });

    socket.on('direct message', (data) => {
      let decoded = this.crypto.cryptoBoxOpen(
        data.cryptoBoxHex,
        data.nonceHex,
        data.senderProfile.publicKeyHex
      );
      alert(`${data.senderProfile.username} says: ${decoded}`);

    });
  }

  join(room) {
  }

  startConversation(id) {
  }

  sendMessageTo(recipientProfile, message) {
    // destructure the output of cryptoBox
    let [secretBoxBin, nonceBin] = this.crypto.cryptoBox(
      message,
      recipientProfile.publicKeyHex
    );

    // create a profile object for the sender,
    // adding their public key from CryptoService
    let senderProfile = _.extend(
      this.auth.getCurrentUser(),
      { publicKeyHex: this.crypto.getPublicKeyHex() }
    );

    this.socket.emit('direct message', {
      cryptoBoxHex: this.crypto.toHex(secretBoxBin),
      nonceHex: this.crypto.toHex(nonceBin),
      senderProfile,
      recipientProfile
    });
  }
}

