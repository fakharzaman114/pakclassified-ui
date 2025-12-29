import { TestBed } from '@angular/core/testing';

import { AdvertisementSubcategoryService } from './advertisement-subcategory.service';

describe('AdvertisementSubcategoryService', () => {
  let service: AdvertisementSubcategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdvertisementSubcategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
