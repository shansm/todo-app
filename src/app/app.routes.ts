import { provideRouter, RouterConfig } from '@angular/router';
import { TodoComponent } from './todo';

export const routes: RouterConfig = [
  { path: '', component: TodoComponent }
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];
