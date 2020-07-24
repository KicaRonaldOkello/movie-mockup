import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatIconRegistry} from '@angular/material/icon';
import {Router} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';
import {ModalComponent} from '../../shared/modal/modal.component';
import {MatDialog} from '@angular/material/dialog';
import Helpers from '../../../helpers/helpers';

@Component({
  selector: 'app-translator-cards',
  templateUrl: './translator-cards.component.html',
  styleUrls: ['./translator-cards.component.scss']
})
export class TranslatorCardsComponent implements OnInit {

  displayDeleteButton = false;
  @Input() data: any;
  @Output() deletedTranslatorPackageId = new EventEmitter();
  loadingProfileImage = true;
  userData;
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    public dialog: MatDialog
  ) {
    this.matIconRegistry.addSvgIcon(
      'delete',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/delete.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'refresh',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/refresh.svg')
    );
    this.userData = Helpers.getUserData();
  }

  ngOnInit(): void {
    if (this.userData.userId === this.data.ownerId) {
      this.displayDeleteButton = true;
    }
  }

  openDialog(id): void {
    const dataType = 'package';
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '500px', height: '150px',
      data: { dataType }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'delete package') {
        this.deletedTranslatorPackageId.emit(id);
      }
    });
  }
}
