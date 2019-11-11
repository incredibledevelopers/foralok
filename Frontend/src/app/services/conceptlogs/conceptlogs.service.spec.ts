import { TestBed, inject } from '@angular/core/testing';

import { ConceptlogsService } from './conceptlogs.service';

describe('ConceptlogsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConceptlogsService]
    });
  });

  it('should be created', inject([ConceptlogsService], (service: ConceptlogsService) => {
    expect(service).toBeTruthy();
  }));
});
