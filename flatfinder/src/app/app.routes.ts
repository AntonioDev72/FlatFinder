import { Routes } from '@angular/router';

import { LoginComponent } from './login/login';
import { RegisterComponent } from './register/register';
import { ProfileComponent } from './profile/profile';
import { AllUsersComponent } from './all-users/all-users';
import { FlatViewMessagesComponent } from './flat-view-messages/flat-view-messages';

export const appRoutes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'users', component: AllUsersComponent },
  { path: 'messages', component: FlatViewMessagesComponent },
  { path: '**', redirectTo: 'login' }
];
