import { TestBed } from '@angular/core/testing';

import { TermsAndConditionsService } from './terms-and-conditions.service';

describe('TermsAndConditionsService', () => {
  let service: TermsAndConditionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TermsAndConditionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
