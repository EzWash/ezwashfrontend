import { TestBed } from '@angular/core/testing';

import { ServiceApiService } from './service-api.service';

describe('ServiceService', () => {
  let service: ServiceApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
