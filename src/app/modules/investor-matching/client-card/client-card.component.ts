import { Component, OnInit, Input } from '@angular/core';
import { ShareDataService } from 'src/app/services/share-data/share-data.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../../shared/modal/modal.component';

import * as moment from 'moment';

@Component({
  selector: 'app-client-card',
  templateUrl: './client-card.component.html',
  styleUrls: ['./client-card.component.scss']
})
export class ClientCardComponent implements OnInit {

  @Input() cardData: any;
  showEditable = false;
  constructor(
    private shareDataService: ShareDataService,
    private matIconRegistry: MatIconRegistry,
    private router: Router,
    public dialog: MatDialog,
    private domSanitizer: DomSanitizer,
    ) {
    this.shareDataService.makeClientCardEditable.subscribe(res => {
      if (res === 'true') {
        this.showEditable = true;
      }
    });
    this.matIconRegistry.addSvgIcon(
      'delete',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/delete.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'read',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/book.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'refresh',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/refresh.svg')
    );
  }

  ngOnInit() {
  }

  displayInvestmentProject(id) {
    this.router.navigateByUrl(`/investor-matching/${id}`);
  }

  updateThisProject(cardData) {
    this.shareDataService.editProject(cardData);
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
