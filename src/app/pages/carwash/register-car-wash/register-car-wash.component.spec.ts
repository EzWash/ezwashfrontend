import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterCarWashComponent } from './register-car-wash.component';

describe('RegisterCarWashComponent', () => {
  let component: RegisterCarWashComponent;
  let fixture: ComponentFixture<RegisterCarWashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterCarWashComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterCarWashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
