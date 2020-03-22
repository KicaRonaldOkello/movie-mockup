import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayClientCardsComponent } from './display-client-cards.component';

describe('DisplayClientCardsComponent', () => {
  let component: DisplayClientCardsComponent;
  let fixture: ComponentFixture<DisplayClientCardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayClientCardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayClientCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
