import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiquidationRequestModalComponent } from './liquidation-request-modal.component';

describe('LiquidationRequestModalComponent', () => {
  let component: LiquidationRequestModalComponent;
  let fixture: ComponentFixture<LiquidationRequestModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiquidationRequestModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiquidationRequestModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
