import { Component, OnInit, Input } from '@angular/core';
import { ShareDataService } from 'src/app/services/share-data/share-data.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';

@Component({
  selector: 'app-client-card',
  templateUrl: './client-card.component.html',
  styleUrls: ['./client-card.component.scss']
})
export class ClientCardComponent implements OnInit {

  @Input() cardData:any;
  showEditable:boolean = false;
  constructor(
    private shareDataService: ShareDataService,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,) {
    this.shareDataService.makeClientCardEditable.subscribe(res => {
      if (res == 'true') {
        this.showEditable = true;
      }
    });
    this.matIconRegistry.addSvgIcon(
      "delete",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/delete.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "read",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/book.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "refresh",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/refresh.svg")
    );
  }

  ngOnInit() {
  }

}
