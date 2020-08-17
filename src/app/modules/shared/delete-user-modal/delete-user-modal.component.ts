import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-delete-user-modal',
  templateUrl: './delete-user-modal.component.html',
  styleUrls: ['./delete-user-modal.component.scss']
})
export class DeleteUserModalComponent implements OnInit {

  reason = new FormControl('');
  action: any;
  constructor(public dialogRef: MatDialogRef<DeleteUserModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.action = this.data.action;
  }

  onNoClick(data): void {
    this.dialogRef.close({reply: `${data} no`, reason: '' });
  }

  onYesClick(data): void {
    this.dialogRef.close({ reply: `${data} yes`, reason: this.reason.value });
  }

}
