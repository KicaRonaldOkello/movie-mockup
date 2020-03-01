import { TestBed } from '@angular/core/testing';

import { GetBlogsService } from './get-blogs.service';

describe('GetBlogsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetBlogsService = TestBed.get(GetBlogsService);
    expect(service).toBeTruthy();
  });
});
