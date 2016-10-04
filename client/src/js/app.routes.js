import { RouterModule } from '@angular/router';

import { WelcomeComponent } from './components/welcome.component';
import { ChatComponent } from './components/chat.component';
import { AuthComponent } from './components/auth.component';
import { RequireLoggedIn } from './services/requireLoggedIn';

const appRoutes = [
  {
    path: 'welcome',
    component: WelcomeComponent
  },
  {
    path: 'chat',
    component: ChatComponent,
    canActivate: [RequireLoggedIn]
  },
  {
    path: 'auth/:mode',
    component: AuthComponent
  },
  {
    path: '**',
    component: WelcomeComponent
  }
];

export const routing = RouterModule.forRoot(appRoutes, { useHash:true });
// export const routing = RouterModule.forRoot(appRoutes);

export const appRoutingProviders = [];

