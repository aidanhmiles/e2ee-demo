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
      window.nacl = nacl;
    });
  }

  checkKey() {
  }

  ensureKeypair() {
    // if not local keypair
    if (!this.keypair) {
      this.generateAndStoreKey();
    }
  }

  hasKeypair() {
    return !!this.keypair;
  }

  generateAndStoreKey() {
    // for now, keypair just exists in memory
    // which is BAD, should be imported using webcrypto cryptokey module
    // this is big TODO
    this.keypair = this.nacl.crypto_box_keypair();
  }

  unlockKey() {
  }

  bcryptHash(password) {
  }
  bcryptCompare(password, hash) {
  }

  getPublicKeyHex() {
    return this.nacl.to_hex(this.keypair.boxPk);
  }

  fromHex(string) {
    return this.nacl.from_hex(string);
  }

  cryptoBox(messageString, recipientPk) {
    let nonce = this.nacl.crypto_box_random_nonce();
    let messageBin = this.nacl.encode_utf8(messageString);
    let box;

    try {
      debugger;
      box = this.nacl.crypto_box(messageBin, nonce, recipientPk, this.keypair.boxSk);
    } catch (e) {
      log(e);
      debugger;
    }

    return box;
  }

  cryptoBoxOpen(cipherTextBin, nonce, senderPk) {
    return this.nacl.crypto_box_open(cipherTextBin, nonce, senderPk, this.keypair.boxSk);
  }

}

