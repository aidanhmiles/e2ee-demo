import { Component } from '@angular/core';
import { SocketService } from '../services/socket.service';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';

@Component({
  template: require('../../templates/chat.html')
})

export class ChatComponent {
  constructor(socketService: SocketService, auth: AuthService) {
    let self = this;

    this.currentUser = auth.getCurrentUser();
    self.socket = socketService.socket;

    this.message = {
      text: 'write a message!'
    };

    this.listen();
  }

  listen() {
    this.socket.on('new user', (user) => {
      debugger;
    });

    this.socket.on('user disconnected', (user) => {
    });

    this.socket.on('direct message', (msg) => {
    });

  }

  sendMessage() {
    this.socket.emit('test message', this.message.text);
    this.message.text = '';
  }

  getConnectedClients() {
    // return this.socket.connected;
  }

}

