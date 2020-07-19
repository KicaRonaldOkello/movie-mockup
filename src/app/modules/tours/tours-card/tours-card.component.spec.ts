import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToursCardComponent } from './tours-card.component';

describe('ToursCardComponent', () => {
  let component: ToursCardComponent;
  let fixture: ComponentFixture<ToursCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToursCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToursCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
