import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {SystemSettingsService} from '../../../services/system-settings/system-settings.service';
import {LiquidationRequestModalComponent} from '../../shared/liquidation-request-modal/liquidation-request-modal.component';
import {MatDialog} from '@angular/material/dialog';
import {SystemSettingModalComponent} from '../../shared/system-setting-modal/system-setting-modal.component';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-system-settings',
  templateUrl: './system-settings.component.html',
  styleUrls: ['./system-settings.component.scss']
})
export class SystemSettingsComponent implements OnInit {

  systemSettingsForm: FormGroup;
  data;
  pageCount;
  limit = 50;
  length;
  page = 0;
  loadingSystemSettings = true;
  savingSystemSetting = false;
  savedItemId;
  displayedColumns = ['settingId', 'settingValue', 'settingDesc', 'update'];
  constructor(
    private fb: FormBuilder,
    private systemSettingsService: SystemSettingsService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    ) { }

  ngOnInit(): void {
    this.getAllSystemSettings({});
    this.systemSettingsForm = this.fb.group({
      settingCode: [''],
      settingValue: ['']
    });
  }

  getAllSystemSettings(searchData) {
    this.systemSettingsService.getAllSystemSettings({limit: this.limit, page: this.page, ...searchData}).subscribe(res => {
      this.loadingSystemSettings = false;
      this.data = res.items;
      this.pageCount = res.pageCount;
      this.length = res.pageCount > 0 ? (this.limit * this.pageCount) : this.data.length;
    });
  }

  nextOrPreviousPage(event) {
    if (event.pageIndex < event.previousPageIndex) {
      this.page = this.page - 1;
      this.getAllSystemSettings({});
    } else {
      this.page = this.page + 1;
      this.getAllSystemSettings({});
    }
  }

  searchSystemSettings() {
    this.getAllSystemSettings(this.systemSettingsForm.value);
  }

  editValue(settingValue, settingId) {
    const dialogRef = this.dialog.open(SystemSettingModalComponent, {
      width: '450px', height: '260px',
      data: { settingValue, action: 'editingValue'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.reply === 'confirm editValue') {
        const objIndex = this.data.findIndex((obj => obj.id === settingId));
        this.data[objIndex].settingValue = result.returnedSettingValue;
        delete this.data[objIndex].status;
      } else if (result.reply === 'cancel editValue') {
      }
    });
  }

  editSettingDesc(settingDesc, settingId) {
    const dialogRef = this.dialog.open(SystemSettingModalComponent, {
      width: '450px', height: '260px',
      data: { settingDesc, action: 'editingDescription'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.reply === 'confirm editDescription') {
        const objIndex = this.data.findIndex((obj => obj.id === settingId));
        this.data[objIndex].settingDesc = result.returnedSettingValue;
        delete this.data[objIndex].status;
      } else {
      }
    });
  }

  updateSystemSetting(settingId) {
    this.savedItemId = settingId;
    this.savingSystemSetting = true;
    const objIndex = this.data.findIndex((obj => obj.id === settingId));
    this.saveSystemSetting(this.data[objIndex]);
  }

  saveSystemSetting(data) {
    this.systemSettingsService.saveSystemSetting(data).subscribe(res => {
      this.savingSystemSetting = false;
      if (res.statusCode === '0') {
        this.snackBar.open(`You have successfully updated this liquidation system setting.` + '', '', {
          duration: 3000,
          panelClass: ['green-snackbar']
        });
      } else {
        this.snackBar.open(res.statusDesc, '', {
          duration: 6000,
          panelClass: ['red-snackbar']
        });
      }
    });
  }
}
