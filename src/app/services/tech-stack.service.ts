import { Injectable } from '@angular/core';

@Injectable()
export class TechStackService {
  technologies() {
    return `
      Angular 2.0.0,
      Webpack,
      TypeScript,
      Bootstrap 4,
      Jasmine,
      Karma,
      Istanbul,
      Protractor,
      Sass
      and TSLint`;
  }
}
