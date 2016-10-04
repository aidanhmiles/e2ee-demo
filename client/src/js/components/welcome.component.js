import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service.js';

@Component({
  template: `<h1>Welcome!</h1>
  `
})

export class WelcomeComponent {
  constructor(auth: AuthService) {
  }
}

