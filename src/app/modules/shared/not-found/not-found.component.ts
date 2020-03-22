import { Component, OnInit } from '@angular/core';
import { ShareDataService } from 'src/app/services/share-data/share-data.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {

  constructor(private shareDataService: ShareDataService,) {
    this.shareDataService.showAd('true');
  }

  ngOnInit() {
  }

}
