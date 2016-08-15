import {
  inject,
  addProviders
} from '@angular/core/testing';

import { TechStackService } from './tech-stack.service';

describe('Tech Stack Service', () => {
  beforeEach(() => {
    addProviders([TechStackService]);
  });

  it('technologies array should contain the technologies used in the app',
    inject([TechStackService], (techStackService: TechStackService) => {
    expect(techStackService.technologies).toContain('Angular');
  }));
});
