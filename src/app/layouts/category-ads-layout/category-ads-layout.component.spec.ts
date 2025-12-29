import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryAdsLayoutComponent } from './category-ads-layout.component';

describe('CategoryAdsLayoutComponent', () => {
  let component: CategoryAdsLayoutComponent;
  let fixture: ComponentFixture<CategoryAdsLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryAdsLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryAdsLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
