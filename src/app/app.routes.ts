import { Routes } from '@angular/router';
import { MainComponent } from './main/main.component';

export const routes: Routes = [
  { path: '', component: MainComponent },
  {
    path: 'stat',
    loadComponent: () =>
      import('./main/hidden/visitors.component/visitors.component').then(
        (m) => m.VisitorsComponent
      ),
  },
  { path: '**', redirectTo: '/' },
];
