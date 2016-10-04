import { Injectable } from '@angular/core';
require('script!js-nacl/lib/nacl_factory');

const bcrypt = require('bcryptjs');


@Injectable()
export class CryptoService {

  keypairStorageId = 'naive_key';

  constructor() {
    this.SubtleCrypto = window.crypto.subtle;

    nacl_factory.instantiate((nacl) => {
      this.nacl = nacl;
    });
  }

  checkKey() {
  }

  ensureKeypair() {
    // if not local keypair
    if (!this.hasKeypair()) {
      this.generateAndStoreKey();
    }
  }

  hasKeypair() {
    return !!localStorage.getItem(this.keypairStorageId);
  }

  generateAndStoreKey() {
    // for now, saving pk in local storage
    // which is BAD
    // this is big TODO
    this.keypair = this.nacl.crypto_box_keypair();
    localStorage.setItem(this.keypairStorageId, this.keypair);
  }

  unlockKey() {
  }

  bcryptHash(password) {
  }

  bcryptCompare(password, hash) {
  }

  getKey() {
    return this.pair;
  }

}

