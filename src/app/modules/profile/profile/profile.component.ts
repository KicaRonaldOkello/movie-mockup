import { Component, OnInit } from '@angular/core';
import {ShareDataService} from '../../../services/share-data/share-data.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(
    private shareDataService: ShareDataService,
  ) {
    this.shareDataService.showAd('true');
  }

  ngOnInit(): void {
  }

}
