import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTranslatorComponent } from './create-translator.component';

describe('CreateTranslatorComponent', () => {
  let component: CreateTranslatorComponent;
  let fixture: ComponentFixture<CreateTranslatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateTranslatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTranslatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
