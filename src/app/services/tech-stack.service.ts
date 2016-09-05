import { Injectable } from '@angular/core';

@Injectable()
export class TechStackService {
  technologies() {
    return `
      AngularJS 2 (RC5),
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
