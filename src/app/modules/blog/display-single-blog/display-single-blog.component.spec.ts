import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplaySingleBlogComponent } from './display-single-blog.component';

describe('DisplaySingleBlogComponent', () => {
  let component: DisplaySingleBlogComponent;
  let fixture: ComponentFixture<DisplaySingleBlogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplaySingleBlogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplaySingleBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
