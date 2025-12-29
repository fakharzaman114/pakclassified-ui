import { TestBed } from '@angular/core/testing';

import { AdvertisementImageService } from './advertisement-image.service';

describe('AdvertisementImageService', () => {
  let service: AdvertisementImageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdvertisementImageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
