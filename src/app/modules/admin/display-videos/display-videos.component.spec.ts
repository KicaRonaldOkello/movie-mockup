import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayVideosComponent } from './display-videos.component';

describe('DisplayVideosComponent', () => {
  let component: DisplayVideosComponent;
  let fixture: ComponentFixture<DisplayVideosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayVideosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayVideosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
