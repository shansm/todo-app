import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'todos', pathMatch: 'full'}
];

export const routing = RouterModule.forRoot(routes);
