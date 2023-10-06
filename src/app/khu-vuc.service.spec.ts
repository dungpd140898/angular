import { TestBed } from '@angular/core/testing';

import { KhuVucService } from './khu-vuc.service';

describe('KhuVucService', () => {
  let service: KhuVucService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KhuVucService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
