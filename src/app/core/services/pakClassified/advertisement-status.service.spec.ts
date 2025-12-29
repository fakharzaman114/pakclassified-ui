import { TestBed } from '@angular/core/testing';

import { AdvertisementStatusService } from './advertisement-status.service';

describe('AdvertisementStatusService', () => {
  let service: AdvertisementStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdvertisementStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
