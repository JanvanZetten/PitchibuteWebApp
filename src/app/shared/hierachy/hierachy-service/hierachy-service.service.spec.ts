import { TestBed } from '@angular/core/testing';

import { HierachyServiceService } from './hierachy-service.service';

describe('HierachyServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HierachyServiceService = TestBed.get(HierachyServiceService);
    expect(service).toBeTruthy();
  });
});
