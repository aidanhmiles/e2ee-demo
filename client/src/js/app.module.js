
// core modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// Auth0 jwt module
import { AUTH_PROVIDERS } from 'angular2-jwt';

// project stylesheet
require('../../src/scss/main.scss');

// project modules
import { WelcomeComponent } from './components/welcome.component';
import { AppComponent } from './components/app.component';
import { ChatComponent } from './components/chat.component';
import { AuthComponent } from './components/auth.component';
import { SocketService } from './services/socket.service';
import { AuthService } from './services/auth.service';
import { CryptoService } from './services/crypto.service';
import { RequireLoggedIn } from './services/requireLoggedIn';
import { routing, appRoutingProviders } from './app.routes';

// app module definition
@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  declarations: [
    WelcomeComponent,
    ChatComponent,
    AppComponent,
    AuthComponent
  ],
  providers: [
    RequireLoggedIn,
    appRoutingProviders,
    SocketService,
    AuthService,
    CryptoService,
    AUTH_PROVIDERS
  ],
  bootstrap: [ AppComponent ]
})

export class AppModule { }
