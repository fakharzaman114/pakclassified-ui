import { TestBed } from '@angular/core/testing';

import { AdvertisementTypeService } from './advertisement-type.service';

describe('AdvertisementTypeService', () => {
  let service: AdvertisementTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdvertisementTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
