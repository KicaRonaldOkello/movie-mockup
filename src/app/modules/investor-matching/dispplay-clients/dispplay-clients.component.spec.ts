import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DispplayClientsComponent } from './dispplay-clients.component';

describe('DispplayClientsComponent', () => {
  let component: DispplayClientsComponent;
  let fixture: ComponentFixture<DispplayClientsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DispplayClientsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DispplayClientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
