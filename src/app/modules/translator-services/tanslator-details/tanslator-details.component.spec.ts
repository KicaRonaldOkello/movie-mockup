import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TanslatorDetailsComponent } from './tanslator-details.component';

describe('TanslatorDetailsComponent', () => {
  let component: TanslatorDetailsComponent;
  let fixture: ComponentFixture<TanslatorDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TanslatorDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TanslatorDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
