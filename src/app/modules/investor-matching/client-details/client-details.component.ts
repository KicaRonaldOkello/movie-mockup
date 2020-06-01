import { Component, OnInit } from '@angular/core';
import { ShareDataService } from 'src/app/services/share-data/share-data.service';
import { InvestmentProjectService } from 'src/app/services/investment-project/investment-project.service';
import { ActivatedRoute, Router } from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {ImageModalComponent} from '../../shared/image-modal/image-modal.component';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.scss']
})
export class ClientDetailsComponent implements OnInit {

  data;
  id: any;
  loadingInvestmentProject = true;
  loadingCoverImage = true;
  notFound = '';
  constructor(
    private shareDataService: ShareDataService,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
    private investmentProjectService: InvestmentProjectService,
    private router: Router,
    ) {
    this.shareDataService.showAd('true');
  }

  ngOnInit() {

      this.activatedRoute.queryParams.subscribe(params => {
        this.id = params.id;
      });


      this.investmentProjectService.getSingleInvestmentProject(this.id).subscribe(res => {
      if (res.status.statusCode === '100') {
        this.notFound = res.status.statusDesc;
        this.loadingInvestmentProject = false;
      } else if (res.status.statusCode === '0') {
        this.data = res;
        this.loadingInvestmentProject = false;
      }
    });
  }

  coverImageLoaded() {
    this.loadingCoverImage = false;
  }

  sendDataToOrderDetails() {
    this.shareDataService.sendInvestorMatchingData(this.data.id);
  }

  zoomImage(url): void {
    const dialogRef = this.dialog.open(ImageModalComponent, {
      width: '80vw', height: '80vh',
      data: {imageUrl: url},
      panelClass: 'my-dialog'
    });
  }


}
