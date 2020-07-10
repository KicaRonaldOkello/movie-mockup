import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import Helpers from '../../../helpers/helpers';
import {ModalComponent} from '../../shared/modal/modal.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-tours-card',
  templateUrl: './tours-card.component.html',
  styleUrls: ['./tours-card.component.scss']
})
export class ToursCardComponent implements OnInit {

  userData;
  @Input() data: any;
  @Output() deletedItemId = new EventEmitter();
  constructor(public dialog: MatDialog) { }
  ngOnInit(): void {
    this.userData = Helpers.getUserData();
  }

  openDialog(id): void {
    const dataType = 'package';
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '500px', height: '150px',
      data: { dataType }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'delete package') {
        this.deletedItemId.emit(id);
      }
    });
  }

}
