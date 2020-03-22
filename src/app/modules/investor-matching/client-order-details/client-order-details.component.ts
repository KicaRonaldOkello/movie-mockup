import { Component, OnInit } from '@angular/core';
import { ShareDataService } from 'src/app/services/share-data/share-data.service';

@Component({
  selector: 'app-client-order-details',
  templateUrl: './client-order-details.component.html',
  styleUrls: ['./client-order-details.component.scss']
})
export class ClientOrderDetailsComponent implements OnInit {

  data = [1, 2, 3];
  
  constructor(private shareDataService: ShareDataService) {
    this.shareDataService.showAd('true');
  }

  ngOnInit() {
  }

}
