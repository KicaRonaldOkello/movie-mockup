import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayTranslatorsComponent } from './display-translators.component';

describe('DisplayTranslatorsComponent', () => {
  let component: DisplayTranslatorsComponent;
  let fixture: ComponentFixture<DisplayTranslatorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayTranslatorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayTranslatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
