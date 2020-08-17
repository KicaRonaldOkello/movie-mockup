import { Component, OnInit } from '@angular/core';
import {TermsAndConditionsService} from '../../../services/terms/terms-and-conditions.service';

@Component({
  selector: 'app-terms-and-condtions',
  templateUrl: './terms-and-condtions.component.html',
  styleUrls: ['./terms-and-condtions.component.scss']
})
export class TermsAndCondtionsComponent implements OnInit {

  loadingTerms = true;
  constructor(private termsAndConditionsService: TermsAndConditionsService) { }

  terms;
  ngOnInit(): void {
    this.termsAndConditionsService.getTermsAndConditions().subscribe(res => {
      this.loadingTerms = false;
      if (res.settingCode === 'TERMS_AND_CONDITIONS' && res.status.statusCode === '0') {
        this.terms = res.settingValue;
      }
    });
  }

}
