import { Component, OnInit } from '@angular/core';
import {ShareDataService} from '../../../services/share-data/share-data.service';
import {TranslationService} from '../../../services/translation/translation.service';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-display-translators',
  templateUrl: './display-translators.component.html',
  styleUrls: ['./display-translators.component.scss']
})
export class DisplayTranslatorsComponent implements OnInit {

  translatorPackages;
  page = 0;
  payment;
  limit = 12;
  pageCount;
  loadingPage = true;
  loadingTranslatorPackages = false;
  constructor(
    private shareDataService: ShareDataService,
    private  translationService: TranslationService,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
  ) {
    this.shareDataService.showAd('true');
    this.shareDataService.showUserInfo('');
    this.matIconRegistry.addSvgIcon(
      'previous-page',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/double-arrow-left.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'next-page',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/double-arrow-right.svg')
    );
  }

  ngOnInit(): void {
    this.getAllTranslatorPackages({});
    this.shareDataService.translationParameters.subscribe(res => {
      if (res !== '') {
        this.searchTranslationPackage(res);
      }
    });

    this.payment = this.route.snapshot.queryParamMap.get('payment');
    this.successMessage();
    history.pushState(null, '', location.href.split('?')[0]);
  }

  getAllTranslatorPackages(queryParams) {
    this.translationService.getAllTranslatorPackages(this.page, this.limit, queryParams).subscribe(res => {
      this.loadingTranslatorPackages = false;
      this.loadingPage = false;
      this.translatorPackages = res.items;
      this.pageCount = res.pageCount;
    });
  }

  nextPage() {
    if ((this.pageCount - this.page) > 1) {
      this.page = this.page + 1;
      this.loadingTranslatorPackages = true;
      this.getAllTranslatorPackages({});
    }
  }

  previousPage() {
    if (this.page > 0) {
      this.page = this.page - 1;
      this.loadingTranslatorPackages = true;
      this.getAllTranslatorPackages({});
    }
  }

  searchTranslationPackage(data) {
    this.page = 0;
    this.loadingTranslatorPackages = true;
    this.getAllTranslatorPackages(data);
  }

  successMessage() {
    if (this.payment === 'Success') {
      this.snackBar.open('Your payment has been successful', '', {
        duration: 5000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
        panelClass: ['green-snackbar']
      });
    }
  }

  deletePackage(id) {
    this.translationService.deleteTranslatorPakage(id).subscribe(res => {
      if (res.statusCode === '0') {
        this.translatorPackages = this.translatorPackages.filter((item) => item.id !== id);
        this.snackBar.open('Package deleted successfully.', '', {
          duration: 6000,
          panelClass: ['green-snackbar']
        });
      } else {
        this.snackBar.open(res.statusDesc, '', {
          duration: 6000,
          panelClass: ['red-snackbar']
        });
      }
    });
  }
}
