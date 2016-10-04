import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from '../services/auth.service';

@Component({
  template: require('../../templates/auth.html')
})

export class AuthComponent {
  constructor(auth: AuthService, router: Router, activeRoute: ActivatedRoute) {
    this.credentials = {};
    this.auth = auth;
    this.router = router;
    this.activeRoute = activeRoute;

    // no reason to be here if logged in already
    if (this.auth.isLoggedIn()) {
      this.router.navigate(['/chat']);
    }
  }

  ngOnInit() {
    this.activeRoute.params.subscribe((params) => {
      this.mode = params.mode;
      this.pageTitle = params.mode === 'signup' ? 'Sign Up' : 'Login';
    });
  }
  getMode() {
    return this.mode;
  }

  submit() {
    // if the component is serving as a signup form
    if (this.getMode() === 'signup') {
      this.auth.registerUser(this.credentials)
          .subscribe({
            next: (res) => {
              this.router.navigate(['/chat']);
            },
            error: (e) => {
              // alert the user that login failed
              console.log('Authentication error');
            },
            complete: () => {
              // dont care?
              console.log('logged in by now');
            }
          });
    }

    // if the component is serving as a login form
    else {
      this.auth.login(this.credentials)
          .subscribe({
            next: (res) => {
              this.router.navigate(['/chat']);
            },
            error: (e) => {
              // alert the user that login failed
              console.log(e);
              this.setErrorMessage(e._body);
            },
            complete: () => {
              // dont care?
              console.log('logged in by now');
            }
          });
    }
  }

  setErrorMessage(msg) {
    this.errorMsg = msg;
    setTimeout(() => {
      this.errorMsg = '';
    }, 3500);
  }
}
