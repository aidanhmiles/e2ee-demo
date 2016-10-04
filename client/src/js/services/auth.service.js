import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Http, Headers } from '@angular/http';
import { tokenNotExpired } from 'angular2-jwt';

import { CryptoService } from './crypto.service';

// names for data in localStorage
const tokenStorageId = 'id_token';
const userProfileStorageId = 'user_profile';

@Injectable()
export class AuthService {

  constructor(http: Http, crypto: CryptoService, router: Router) {
    this.headers = new Headers({ 'Content-Type': 'application/json' });
    this.http = http;
    this.crypto = crypto;
    this.router = router;
  }

  login(creds) {
    return this.http
               .post(`${env.API_ENDPOINT}/api/auth`, creds, { headers: this.headers })
               .map((res) => res.json())
               .do((res) => {
                 this.setLocalUserData(res);
               });
  }

  registerUser(creds) {
    return this.http
               .post(`${env.API_ENDPOINT}/api/register`, creds, { headers: this.headers })
               .map((res) => res.json())
               .do((res) => {
                 this.setLocalUserData(res);
               });
  }

  setLocalUserData(responseData) {
    this.setCurrentUser(responseData.user);
    this.setToken(responseData.token);
    this.crypto.ensureKeypair();
  }

  unsetLocalUserData() {
    // Remove token from localStorage
    localStorage.removeItem(tokenStorageId);
    localStorage.removeItem(this.crypto.keypairStorageId);
    this.setCurrentUser(null);
  }

  isLoggedIn() {
    // Check if there's an unexpired JWT
    // It searches by default for an item in localStorage with key == 'id_token'
    return tokenNotExpired();
  }

  setCurrentUser(userObj) {
    this.currentUser = userObj;
    localStorage.setItem(userProfileStorageId, JSON.stringify(userObj));
  }

  getCurrentUser() {
    if (!this.currentUser) {
      this.currentUser = JSON.parse(localStorage.getItem(userProfileStorageId));
    }

    return this.currentUser;
  }

  getToken() {
    return localStorage.getItem(tokenStorageId);
  }
  setToken(token) {
    localStorage.setItem(tokenStorageId, token);
  }

  logout() {
    this.unsetLocalUserData();
    this.router.navigate(['/auth/login']);
  }
}

