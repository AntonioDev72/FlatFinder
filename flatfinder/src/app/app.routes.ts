import { Routes } from '@angular/router';

// SEUS COMPONENTES (DEV B)
import { LoginComponent } from './login/login';
import { RegisterComponent } from './register/register';
import { ProfileComponent } from './profile/profile';
import { AllUsersComponent } from './all-users/all-users';
import { FlatViewMessagesComponent } from './flat-view-messages/flat-view-messages';

// COMPONENTES DO TEU AMIGO (DEV A)
import { HomeComponent } from './pages/home/home';
import { NewFlatComponent } from './pages/new-flat/new-flat';
import { ViewFlatComponent } from './pages/viewflat/viewflat';
import { EditFlatComponent } from './pages/editflat/editflat';
import { MyflatsComponent } from './pages/myflats/myflats';
import { FavouritesComponent } from './pages/favourites/favourites';

export const appRoutes: Routes = [
  // HOME
  { path: '', component: HomeComponent },

  // DEV B
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'users', component: AllUsersComponent },
  { path: 'messages', component: FlatViewMessagesComponent },

  // DEV A
  { path: 'new-flat', component: NewFlatComponent },
  { path: 'flat/:id', component: ViewFlatComponent },
  {
    path: 'viewflat/:id',
    loadComponent: () =>
      import('./pages/viewflat/viewflat').then(m => m.ViewFlatComponent)
  },
  { path: 'edit-flat/:id', component: EditFlatComponent },
  { path: 'myflats', component: MyflatsComponent },
  { path: 'favourites', component: FavouritesComponent },

  // FALLBACK
  { path: '**', redirectTo: '' }
];