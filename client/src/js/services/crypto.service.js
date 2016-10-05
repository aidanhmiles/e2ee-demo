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

  // get the local private key in hexadecimal
  getPublicKeyHex() {
    return this.toHex(this.keypair.boxPk);
  }

  // delegate to nacl's to_hex method
  toHex(bin) {
    return this.nacl.to_hex(bin);
  }

  // delegate to nacl's from_hex method
  fromHex(string) {
    return this.nacl.from_hex(string);
  }

  // encrypt a string via nacl's crypto_box
  cryptoBox(messageString, recipientPkHex) {
    let nonce = this.nacl.crypto_box_random_nonce();
    let messageBin = this.nacl.encode_utf8(messageString);
    let recipientPk = this.fromHex(recipientPkHex);
    let box = this.nacl.crypto_box(
      messageBin,
      nonce,
      recipientPk,
      this.keypair.boxSk
    );

    return [box,nonce];
  }

  // decrypt a string via nacl's crypto_box
  cryptoBoxOpen(cryptoBoxHex, nonceHex, senderPkHex) {
    debugger;
    return this.nacl.crypto_box_open(
      this.fromHex(cryptoBoxHex),
      this.fromHex(nonceHex),
      this.fromHex(senderPkHex),
      this.keypair.boxSk
    );
  }

}

