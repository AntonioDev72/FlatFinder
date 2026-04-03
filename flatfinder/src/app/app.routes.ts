import { Routes } from '@angular/router';
import { LoginComponent } from './login/login';
import { RegisterComponent } from './register/register';
import { ProfileComponent } from './profile/profile';
import { AllUsersComponent } from './all-users/all-users';
import { FlatViewMessagesComponent } from './flat-view-messages/flat-view-messages';
import { HomeComponent } from './pages/home/home';
import { NewFlatComponent } from './pages/new-flat/new-flat';
import { ViewFlatComponent } from './pages/viewflat/viewflat';
import { EditFlatComponent } from './pages/editflat/editflat';
import { MyflatsComponent } from './pages/myflats/myflats';
import { FavouritesComponent } from './pages/favourites/favourites';

export const appRoutes: Routes = [

  { path: '', component: HomeComponent },


  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'users', component: AllUsersComponent },
  { path: 'messages', component: FlatViewMessagesComponent },
  { path: 'new-flat', component: NewFlatComponent },
  { path: 'flat/:id', component: ViewFlatComponent },
  { path: 'edit-flat/:id', component: EditFlatComponent },
  { path: 'myflats', component: MyflatsComponent },
  { path: 'favourites', component: FavouritesComponent },


  { path: '**', redirectTo: '' }
];