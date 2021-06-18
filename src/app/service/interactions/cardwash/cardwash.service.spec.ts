import { TestBed } from '@angular/core/testing';

import { CardwashService } from './cardwash.service';

describe('CardwashService', () => {
  let service: CardwashService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CardwashService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
