import { Routes } from '@angular/router';
import { MainComponent } from './main/main.component';

export const routes: Routes = [
  { path: '', component: MainComponent },
  {
    path: 'login',
    loadComponent: () =>
      import('./main/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'stat',
    loadComponent: () =>
      import('./main/stat/stat.component').then((m) => m.StatisticsComponent),
  },
  { path: '**', redirectTo: '/' },
];
