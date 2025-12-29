import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryAdsComponent } from './category-ads.component';

describe('CategoryAdsComponent', () => {
  let component: CategoryAdsComponent;
  let fixture: ComponentFixture<CategoryAdsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryAdsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryAdsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
