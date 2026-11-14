import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  {
    path: 'cv',
    loadComponent: () => import('./cv/cv.component').then((m) => m.CVComponent),
  },
  {
    path: 'stat',
    loadComponent: () =>
      import('./cv/hidden/visitors.component/visitors.component').then(
        (m) => m.VisitorsComponent,
      ),
  },
  {
    path: 'links',
    loadComponent: () =>
      import('./cv/hidden/links.component/links.component').then(
        (m) => m.LinksComponent,
      ),
  },
  {
    path: 'sudoku',
    loadComponent: () =>
      import('./sudoku/sudoku.component').then((m) => m.SudokuComponent),
  },
  { path: '**', redirectTo: '/' },
];
