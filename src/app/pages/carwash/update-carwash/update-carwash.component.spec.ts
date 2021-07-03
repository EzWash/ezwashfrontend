import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCarwashComponent } from './update-carwash.component';

describe('UpdateCarwashComponent', () => {
  let component: UpdateCarwashComponent;
  let fixture: ComponentFixture<UpdateCarwashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateCarwashComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateCarwashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
