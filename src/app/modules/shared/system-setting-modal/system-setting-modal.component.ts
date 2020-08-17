import {Component, Inject, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-system-setting-modal',
  templateUrl: './system-setting-modal.component.html',
  styleUrls: ['./system-setting-modal.component.scss']
})
export class SystemSettingModalComponent implements OnInit {

  action;
  settingValueData: any;
  settingValues = new FormControl('');
  constructor(public dialogRef: MatDialogRef<SystemSettingModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.action = this.data.action;
    if (this.action === 'editingValue') {
      this.settingValueData = this.data.settingValue;
    } else {
      this.settingValueData = this.data.settingDesc;
    }
    this.settingValues.setValue(this.settingValueData);
  }

  onClick(data): void {
    this.dialogRef.close({reply: `${data}`, returnedSettingValue: this.settingValues.value });
  }

}
