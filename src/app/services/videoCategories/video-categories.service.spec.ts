import { TestBed } from '@angular/core/testing';

import { VideoCategoriesService } from './video-categories.service';

describe('VideoCategoriesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VideoCategoriesService = TestBed.get(VideoCategoriesService);
    expect(service).toBeTruthy();
  });
});
