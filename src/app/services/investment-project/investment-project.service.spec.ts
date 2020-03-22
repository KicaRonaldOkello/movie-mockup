import { TestBed } from '@angular/core/testing';

import { InvestmentProjectService } from './investment-project.service';

describe('InvestmentProjectService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InvestmentProjectService = TestBed.get(InvestmentProjectService);
    expect(service).toBeTruthy();
  });
});
