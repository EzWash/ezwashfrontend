import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeCarWashComponent } from './home-car-wash.component';

describe('HomeCarWashComponent', () => {
  let component: HomeCarWashComponent;
  let fixture: ComponentFixture<HomeCarWashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeCarWashComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeCarWashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
