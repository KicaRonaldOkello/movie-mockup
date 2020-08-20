import {Component, Inject, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-video-categories-modal',
  templateUrl: './video-categories-modal.component.html',
  styleUrls: ['./video-categories-modal.component.scss']
})
export class VideoCategoriesModalComponent implements OnInit {

  action;
  categoryCode;
  actionData = new FormControl('');
  constructor(public dialogRef: MatDialogRef<VideoCategoriesModalComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.action = this.data.action;
    this.categoryCode = this.data.categoryCode;
    this.actionData.setValue(this.categoryCode);
  }

  onClick(data): void {
    this.dialogRef.close({reply: `${data}`, returnedValue: this.actionData.value });
  }

}
