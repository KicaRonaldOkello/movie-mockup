import { Component, OnInit, Input } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { ShareDataService } from 'src/app/services/share-data/share-data.service';

@Component({
  selector: 'app-display-client-cards',
  templateUrl: './display-client-cards.component.html',
  styleUrls: ['./display-client-cards.component.scss']
})
export class DisplayClientCardsComponent implements OnInit {

  @Input() data: any;
  @Input() pageCount: number;
  @Input() page: number;
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private shareDataService: ShareDataService,
    ) {
      this.matIconRegistry.addSvgIcon(
        'previous-page',
        this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/double-arrow-left.svg')
      );
      this.matIconRegistry.addSvgIcon(
        'next-page',
        this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/double-arrow-right.svg')
      );
  }

  ngOnInit() {
  }


  nextPage() {
    if ((this.pageCount - this.page) > 1) {
    const pageNumber = this.page + 1;
    this.shareDataService.traverseToPage(pageNumber);
    }
  }

  previousPage() {
    if (this.page > 0) {
      const pageNumber = this.page - 1;
      this.shareDataService.traverseToPage(pageNumber);
    }
  }

}
