import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteCarwashesComponent } from './favorite-carwashes.component';

describe('FavoriteCarwashesComponent', () => {
  let component: FavoriteCarwashesComponent;
  let fixture: ComponentFixture<FavoriteCarwashesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavoriteCarwashesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoriteCarwashesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
