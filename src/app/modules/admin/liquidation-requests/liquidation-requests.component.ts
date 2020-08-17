import { Component, OnInit } from '@angular/core';
import {LiquidationService} from '../../../services/liquidation/liquidation.service';

@Component({
  selector: 'app-liquidation-requests',
  templateUrl: './liquidation-requests.component.html',
  styleUrls: ['./liquidation-requests.component.scss']
})
export class LiquidationRequestsComponent implements OnInit {

  data;
  loadingTableData = true;
  displayedColumns = ['requesterId', 'kycIDType', 'kycIDNumber', 'amount', 'liquidationStatus', 'liquidationChannelAccountDetails'];
  constructor(private liquidationService: LiquidationService) { }

  ngOnInit(): void {
    this.getAllLiquidations();
  }


  getAllLiquidations() {
    this.liquidationService.getAllLiquidations().subscribe(res => {
      this.loadingTableData = false;
      console.log(res.items, '>>>>>>>');
      this.data = res.items;
    });
  }
}
