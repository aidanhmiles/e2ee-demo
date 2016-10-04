
import { Component } from '@angular/core';

import { AuthService } from '../services/auth.service';

@Component({
  // #mountMe is the id of a div placed in the DOM by webpack / html-webpack-plugin & -template
  selector: '#mountMe',
  template: require('../../templates/app.html')
})
export class AppComponent {
  constructor(auth: AuthService) {
    this.auth = auth;
  }
}

