import { Component, OnInit } from '@angular/core';
import {LiquidationService} from '../../../services/liquidation/liquidation.service';

@Component({
  selector: 'app-liquidation-requests',
  templateUrl: './liquidation-requests.component.html',
  styleUrls: ['./liquidation-requests.component.scss']
})
export class LiquidationRequestsComponent implements OnInit {

  data;
  displayedColumns = ['requesterId', 'kycIDType', 'kycIDNumber', 'amount', 'liquidationStatus', 'liquidationChannel'];
  constructor(private liquidationService: LiquidationService) { }

  ngOnInit(): void {
    this.getAllLiquidations();
  }


  getAllLiquidations() {
    this.liquidationService.getAllLiquidations().subscribe(res => {
      console.log(res.items, '>>>>>>>');
      this.data = res.items;
    });
  }
}
