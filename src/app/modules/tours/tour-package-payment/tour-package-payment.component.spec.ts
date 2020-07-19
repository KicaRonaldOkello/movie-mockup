import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TourPackagePaymentComponent } from './tour-package-payment.component';

describe('TourPackagePaymentComponent', () => {
  let component: TourPackagePaymentComponent;
  let fixture: ComponentFixture<TourPackagePaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TourPackagePaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TourPackagePaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
