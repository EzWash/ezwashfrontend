import { TestBed } from '@angular/core/testing';

import { CarduserService } from './carduser.service';

describe('CarduserService', () => {
  let service: CarduserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarduserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
