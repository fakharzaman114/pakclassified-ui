import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostAdvertisementComponent } from './post-advertisement.component';

describe('PostAdvertisementComponent', () => {
  let component: PostAdvertisementComponent;
  let fixture: ComponentFixture<PostAdvertisementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostAdvertisementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostAdvertisementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
