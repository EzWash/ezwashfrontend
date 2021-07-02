import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeCarwashCComponent } from './home-carwash-c.component';

describe('HomeCarwashCComponent', () => {
  let component: HomeCarwashCComponent;
  let fixture: ComponentFixture<HomeCarwashCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeCarwashCComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeCarwashCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
