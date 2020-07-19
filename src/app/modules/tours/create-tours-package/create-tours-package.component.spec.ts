import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateToursPackageComponent } from './create-tours-package.component';

describe('CreateToursPackageComponent', () => {
  let component: CreateToursPackageComponent;
  let fixture: ComponentFixture<CreateToursPackageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateToursPackageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateToursPackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
