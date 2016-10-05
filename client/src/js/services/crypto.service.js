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

  unsetKeypair() {
    // BAD
    // fix later
    delete this.keypair;
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
    // get binary equivalient of messageString
    let messageBin = this.nacl.encode_utf8(messageString);
    // get a random nonce, already in binary form
    let nonce = this.nacl.crypto_box_random_nonce();
    // convert the recipient's public key from hexadecimal
    let recipientPk = this.fromHex(recipientPkHex);
    // create an encryped string that only the other party can read
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
    // decode the binary of...
    return this.nacl.decode_utf8(
      // ...the decoded crypto box data
      this.nacl.crypto_box_open(
        this.fromHex(cryptoBoxHex),
        this.fromHex(nonceHex),
        this.fromHex(senderPkHex),
        this.keypair.boxSk
      )
    );
  }

  bcryptHash(password) {
  }
  bcryptCompare(password, hash) {
  }

}


