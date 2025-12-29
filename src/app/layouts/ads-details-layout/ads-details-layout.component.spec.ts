import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdsDetailsLayoutComponent } from './ads-details-layout.component';

describe('AdsDetailsLayoutComponent', () => {
  let component: AdsDetailsLayoutComponent;
  let fixture: ComponentFixture<AdsDetailsLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdsDetailsLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdsDetailsLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
