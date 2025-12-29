import { TestBed } from '@angular/core/testing';

import { AdvertisementTagService } from './advertisement-tag.service';

describe('AdvertisementTagService', () => {
  let service: AdvertisementTagService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdvertisementTagService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
