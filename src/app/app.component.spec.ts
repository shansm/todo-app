import {
  inject,
  addProviders
} from '@angular/core/testing';
import { BaseRequestOptions, Http } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { AppComponent } from './app.component';

describe('App', () => {
  beforeEach(() => {
    addProviders([
      AppComponent,
      BaseRequestOptions,
      MockBackend,
      {
        provide: Http,
        deps: [MockBackend, BaseRequestOptions],
        useFactory: function useFactory(backend, defaultOptions) {
          return new Http(backend, defaultOptions);
        }
      }
    ]);
  });

});
