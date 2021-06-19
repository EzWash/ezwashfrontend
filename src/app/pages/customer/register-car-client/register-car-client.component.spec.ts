import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterCarClientComponent } from './register-car-client.component';

describe('RegisterCarClientComponent', () => {
  let component: RegisterCarClientComponent;
  let fixture: ComponentFixture<RegisterCarClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterCarClientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterCarClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
