import { Component, OnInit } from '@angular/core';
import { ShareDataService } from 'src/app/services/share-data/share-data.service';
import { InvestmentProjectService } from 'src/app/services/investment-project/investment-project.service';
import { ActivatedRoute, Router } from '@angular/router';

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
    private investmentProjectService: InvestmentProjectService,
    private router: Router,
    ) {
    this.shareDataService.showAd('true');
  }

  ngOnInit() {

      this.id = this.activatedRoute.snapshot.paramMap.get('id');
      this.id = this.id.replace('_', '/');

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


}
