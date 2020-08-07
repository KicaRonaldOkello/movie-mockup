import { Component, OnInit, Input } from '@angular/core';
import { ShareDataService } from 'src/app/services/share-data/share-data.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../../shared/modal/modal.component';

import * as moment from 'moment';
import Helpers from '../../../helpers/helpers';

@Component({
  selector: 'app-client-card',
  templateUrl: './client-card.component.html',
  styleUrls: ['./client-card.component.scss']
})
export class ClientCardComponent implements OnInit {

  @Input() cardData: any;
  // showEditable = false;
  userData;
  showIcons = false;
  constructor(
    private shareDataService: ShareDataService,
    private matIconRegistry: MatIconRegistry,
    private router: Router,
    public dialog: MatDialog,
    private domSanitizer: DomSanitizer,
    ) {
    // this.shareDataService.makeClientCardEditable.subscribe(res => {
    //   if (res === 'true') {
    //     this.showEditable = true;
    //   }
    // });
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

  ngOnInit() {
    if (this.cardData.userId === this.userData.userId) {
      this.showIcons = true;
    }
  }

  deleteProject(id) {
    this.openDialog(id, 'project');
  }


  openDialog(actionData, dataType): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '500px', height: '150px',
      data: {dataType}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'delete project') {
        this.shareDataService.deleteProject(actionData);
      }
    });
  }

}
