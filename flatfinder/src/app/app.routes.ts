import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { NewFlatComponent } from './pages/new-flat/new-flat';
import { ViewFlatComponent } from './pages/viewflat/viewflat';
import { EditFlatComponent } from './pages/editflat/editflat';
import { MyflatsComponent } from './pages/myflats/myflats';
import { FavouritesComponent } from './pages/favourites/favourites';

export const routes: Routes = [
  { path: '', component:  HomeComponent },
  { path: 'new-flat', component: NewFlatComponent },
  { path: 'flat/:id', component: ViewFlatComponent },
  {path: 'viewflat/:id',
  loadComponent: () => import('./pages/viewflat/viewflat').then(m => m.ViewFlatComponent)},
  { path: 'edit-flat/:id', component: EditFlatComponent },
  { path: 'myflats', component: MyflatsComponent },
  { path: 'favourites', component: FavouritesComponent }
];