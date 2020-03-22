import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientOrderDetailsComponent } from './client-order-details.component';

describe('ClientOrderDetailsComponent', () => {
  let component: ClientOrderDetailsComponent;
  let fixture: ComponentFixture<ClientOrderDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientOrderDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientOrderDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
