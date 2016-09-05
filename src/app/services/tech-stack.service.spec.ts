import {
  inject,
  TestBed
} from '@angular/core/testing';
import { TechStackService } from './tech-stack.service';

describe('Tech Stack Service', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TechStackService]
    });
  });

  it(`technologies should be a function
    that returns a string which contains
    the technologies used in the app`,
    inject([TechStackService], (techStackService: TechStackService) => {
    expect(techStackService.technologies()).toContain('Angular');
  }));
});
