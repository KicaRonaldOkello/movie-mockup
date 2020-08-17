import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemSettingModalComponent } from './system-setting-modal.component';

describe('SystemSettingModalComponent', () => {
  let component: SystemSettingModalComponent;
  let fixture: ComponentFixture<SystemSettingModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemSettingModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemSettingModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
