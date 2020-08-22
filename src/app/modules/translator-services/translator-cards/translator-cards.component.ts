import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatIconRegistry} from '@angular/material/icon';
import {Router} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';
import {ModalComponent} from '../../shared/modal/modal.component';
import {MatDialog} from '@angular/material/dialog';
import Helpers from '../../../helpers/helpers';
import {ShareDataService} from '../../../services/share-data/share-data.service';
import * as moment from 'moment';
import {UserModalComponent} from '../../shared/user-modal/user-modal.component';
import {DeleteUserModalComponent} from '../../shared/delete-user-modal/delete-user-modal.component';

@Component({
  selector: 'app-translator-cards',
  templateUrl: './translator-cards.component.html',
  styleUrls: ['./translator-cards.component.scss']
})
export class TranslatorCardsComponent implements OnInit {

  showUserInfo = false;
  displayDeleteButton = false;
  @Input() data: any;
  @Output() deletedTranslatorPackageId = new EventEmitter();
  @Output() userRights = new EventEmitter();
  @Output() blockUser = new EventEmitter();
  loadingProfileImage = true;
  userData;
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    public dialog: MatDialog,
    private shareDataService: ShareDataService,
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
    if (this.userData?.userId === this.data.ownerId) {
      this.displayDeleteButton = true;
    }
    this.shareDataService.displayUserInfo.subscribe(res => {
      if (res !== '') {
        this.showUserInfo = true;
      }
    });
    this.data.createdOn = moment(this.data.createdOn).format('DD/MM/YYYY');
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

  toggleAdminState(event, userId, initialUserRole) {
    event.checked ? this.data.roleId = 'ADMIN' : this.data.roleId = 'USER';
    const action = event.checked ? 'grant' : 'revoke';
    const dialogRef = this.dialog.open(UserModalComponent, {
      width: '500px', height: '180px',
      data: { action }
    });

    dialogRef.afterClosed().subscribe(result => {
       if (result === 'action no') {
        this.data.roleId = initialUserRole;
      } else if (result === 'action yes') {
         const data = {
            userId,
            isAdmin: this.data.roleId === 'ADMIN',
            updatedBy: this.userData.userId
          };
         this.userRights.emit(data);
       }
    });
  }

  toggleDeleteState(event, userId, initialBlockedState) {
    event.checked ? this.data.isBlocked = true : this.data.isBlocked = false;
    const action = event.checked ? 'block' : 'unblock';
    const dialogRef = this.dialog.open(DeleteUserModalComponent, {
      width: '500px', height: event.checked ? '230px' : '180px',
      data: { action }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.reply === 'action no') {
        this.data.isBlocked = initialBlockedState;
      } else if (result.reply === 'action yes') {
        const data = {
          userId,
          isBlocked: this.data.isBlocked,
          updatedBy: this.userData.userId,
          reasonForBlock: result.reason
        };
        this.blockUser.emit(data);
      }
    });
  }

}

