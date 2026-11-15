import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  {
    path: 'cv-green',
    loadComponent: () =>
      import('./cv-green/cv.component').then((m) => m.CVComponent),
  },
  {
    path: 'cv-blue',
    loadComponent: () =>
      import('./cv-blue/cv-blue.component').then((m) => m.CVBlueComponent),
  },
  {
    path: 'stat',
    loadComponent: () =>
      import('./cv-green/hidden/visitors.component/visitors.component').then(
        (m) => m.VisitorsComponent,
      ),
  },
  {
    path: 'links',
    loadComponent: () =>
      import('./cv-green/hidden/links.component/links.component').then(
        (m) => m.LinksComponent,
      ),
  },
  {
    path: 'sudoku',
    loadComponent: () =>
      import('./cv-green/hidden/sudoku/sudoku.component').then(
        (m) => m.SudokuComponent,
      ),
  },
  { path: '**', redirectTo: '/' },
];
