import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoCategoriesModalComponent } from './video-categories-modal.component';

describe('VideoCategoriesModalComponent', () => {
  let component: VideoCategoriesModalComponent;
  let fixture: ComponentFixture<VideoCategoriesModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoCategoriesModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoCategoriesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
