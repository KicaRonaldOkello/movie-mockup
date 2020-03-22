import { Component, OnInit } from '@angular/core';
import { ShareDataService } from 'src/app/services/share-data/share-data.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { InvestmentProjectService } from 'src/app/services/investment-project/investment-project.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.scss']
})
export class ClientDetailsComponent implements OnInit {

  data = [1, 2, 3];
  constructor(
    private shareDataService: ShareDataService,
    ) {
    this.shareDataService.showAd('true');
  }

  ngOnInit() {
  }


}
