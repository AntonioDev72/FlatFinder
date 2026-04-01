import { Routes } from '@angular/router';
import { NewFlatComponent } from './pages/new-flat/new-flat';
import { ViewFlatComponent } from './pages/viewflat/viewflat';
import { EditFlatComponent } from './pages/editflat/editflat';

export const routes: Routes = [
  { path: '', redirectTo: 'new-flat', pathMatch: 'full' },
  { path: 'new-flat', component: NewFlatComponent },
  { path: 'flat/:id', component: ViewFlatComponent },
  {path: 'viewflat/:id',
  loadComponent: () => import('./pages/viewflat/viewflat').then(m => m.ViewFlatComponent)},
  { path: 'edit-flat/:id', component: EditFlatComponent }
];