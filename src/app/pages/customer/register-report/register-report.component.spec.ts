import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterReportComponent } from './register-report.component';

describe('RegisterReportComponent', () => {
  let component: RegisterReportComponent;
  let fixture: ComponentFixture<RegisterReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
