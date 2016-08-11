import { enableProdMode } from '@angular/core';
import { bootstrap } from '@angular/platform-browser-dynamic';
import { HTTP_PROVIDERS } from '@angular/http';

import { AppComponent } from './app/app.component';
import { APP_ROUTER_PROVIDERS } from './app/app.routes';
import { disableDeprecatedForms, provideForms } from '@angular/forms';
import { TechStackService } from './app/shared-services/tech-stack.service';
import { TodoService } from './app/shared-services/todo.service';

// depending on the env mode, enable prod mode or add debugging modules
if (process.env.ENV === 'build') {
  enableProdMode();
}

bootstrap(AppComponent, [
    // These are dependencies of our App
    HTTP_PROVIDERS,
    APP_ROUTER_PROVIDERS,
    disableDeprecatedForms(),
    provideForms(),
    TechStackService,
    TodoService
  ])
  .catch(err => console.error(err))
