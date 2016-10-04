import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

document.addEventListener('DOMContentLoaded', main);

/*
 * Bootstrap our Angular app with a top level NgModule
 */
import { AppModule } from './app.module';

function main() {
  platformBrowserDynamic().bootstrapModule(AppModule)
    .catch((err) => console.log(err));
}

function cryptoCheck() {
  if (!window.crypto || !window.crypto.subtle) {
    alert('Your current browser does not support the Web Cryptography API! This page will not work.');
    return;
  }
  if (!window.indexedDB) {
    alert('Your current browser does not support IndexedDB. This page will not work.');
    return;
  }
}
