import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.scss']
})
export class UserModalComponent implements OnInit {

  action: any;
  constructor(public dialogRef: MatDialogRef<UserModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.action = this.data.action;
  }

  onNoClick(data): void {
    this.dialogRef.close(`${data} yes`);
  }

  onRevokeClick(data): void {
    this.dialogRef.close(`${data} no`);
  }


}
