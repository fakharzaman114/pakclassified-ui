import { TestBed } from '@angular/core/testing';

import { CityAreaService } from './city-area.service';

describe('CityAreaService', () => {
  let service: CityAreaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CityAreaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
