import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardcarwashComponent } from './cardcarwash.component';

describe('CardcarwashComponent', () => {
  let component: CardcarwashComponent;
  let fixture: ComponentFixture<CardcarwashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardcarwashComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardcarwashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
