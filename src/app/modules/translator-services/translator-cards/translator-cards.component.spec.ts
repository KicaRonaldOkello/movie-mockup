import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslatorCardsComponent } from './translator-cards.component';

describe('TranslatorCardsComponent', () => {
  let component: TranslatorCardsComponent;
  let fixture: ComponentFixture<TranslatorCardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TranslatorCardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TranslatorCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
