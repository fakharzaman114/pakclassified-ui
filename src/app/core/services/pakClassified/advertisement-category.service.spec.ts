import { TestBed } from '@angular/core/testing';

import { AdvertisementCategoryService } from './advertisement-category.service';

describe('AdvertisementCategoryService', () => {
  let service: AdvertisementCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdvertisementCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
