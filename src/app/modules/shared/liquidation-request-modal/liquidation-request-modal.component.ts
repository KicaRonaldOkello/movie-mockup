import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-liquidation-request-modal',
  templateUrl: './liquidation-request-modal.component.html',
  styleUrls: ['./liquidation-request-modal.component.scss']
})
export class LiquidationRequestModalComponent implements OnInit {

  reason = new FormControl('');
  action: any;
  constructor(public dialogRef: MatDialogRef<LiquidationRequestModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.action = this.data.action;
  }

  onYesClick(data): void {
    this.dialogRef.close({ reply: `${data} yes`, reason: this.reason.value });
  }

  onNoClick(data): void {
    this.dialogRef.close({reply: `${data} no`, reason: '' });
  }

}
