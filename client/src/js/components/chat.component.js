import { Component } from '@angular/core';
import { SocketService } from '../services/socket.service';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';

import _ from 'lodash';

@Component({
  template: require('../../templates/chat.html')
})

export class ChatComponent {
  constructor(socketService: SocketService, auth: AuthService) {
    let self = this;

    this.currentUser = auth.getCurrentUser();

    this.onlineUsers = [];
    self.socket = socketService.socket;
    self.socketService = socketService;

    this.message = {
      text: 'write a message!'
    };

    this.listen();
  }

  listen() {
    this.socket.on('online users', (users) => {
      this.onlineUsers = users.filter((user) => {
        return user.username !== this.currentUser.username;
      });
    });

  }

  sendMessageTo(userObj, message) {
    message = message || `hi there from ${this.socket.id}`;
    this.socketService.sendMessageTo(userObj, message);
  }

}

