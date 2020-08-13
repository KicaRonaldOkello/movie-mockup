import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiquidationRequestsComponent } from './liquidation-requests.component';

describe('LiquidationRequestsComponent', () => {
  let component: LiquidationRequestsComponent;
  let fixture: ComponentFixture<LiquidationRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiquidationRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiquidationRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
