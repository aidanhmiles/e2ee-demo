import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class RequireLoggedIn {
  constructor(auth: AuthService, router: Router) {
    this.auth = auth;
    this.router = router;
  }
  canActivate() {
    if (this.auth.isLoggedIn()) {
      return true;
    }
    else {
      this.router.navigate(['/auth/login']);
      return false;
    }
  }
}
