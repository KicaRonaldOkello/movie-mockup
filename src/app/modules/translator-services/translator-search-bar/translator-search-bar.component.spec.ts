import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslatorSearchBarComponent } from './translator-search-bar.component';

describe('TranslatorSearchBarComponent', () => {
  let component: TranslatorSearchBarComponent;
  let fixture: ComponentFixture<TranslatorSearchBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TranslatorSearchBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TranslatorSearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
