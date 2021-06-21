import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFavCarWashesComponent } from './list-fav-car-washes.component';

describe('ListFavCarWashesComponent', () => {
  let component: ListFavCarWashesComponent;
  let fixture: ComponentFixture<ListFavCarWashesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListFavCarWashesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListFavCarWashesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
