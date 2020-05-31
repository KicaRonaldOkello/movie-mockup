import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {VideosService} from '../../../services/videos/videos.service';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';
import {environment} from '../../../../environments/environment';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ActivatedRoute} from '@angular/router';
import {OrderService} from '../../../services/order/order.service';
import {SubscriptionsService} from '../../../services/subscriptions/subscriptions.service';
import Helpers from '../../../helpers/helpers';
import {MatDialog} from '@angular/material';
import {PaymentModalComponent} from '../../shared/payment-modal/payment-modal.component';

declare var getpaidSetup: any;
@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.scss']
})
export class VideoListComponent implements OnInit, OnChanges {

  @Input() private  category;
  @Output() videoToBePlayed = new EventEmitter();
  duration = {};
  videos = [];
  loadVideos = true;
  coverImageUrl = '';
  page = 0;
  limit = 20;
  pageCount;
  orderBy = '';
  userData;
  notPaid = false;
  backgroundImages = {
    Movies: 'planet_ape_final',
    Series: 'matrix',
    Sports: 'soccer-ball',
    News: 'news-anchor',
    Documentary: 'dinklage',
    Live: 'simpsons'
  };
  currentCategory;
  constructor(
    private videosService: VideosService,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private orderService: OrderService,
    private subscriptionService: SubscriptionsService,
  ) {
    this.matIconRegistry.addSvgIcon(
      'previous-page',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/left-arrow.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'next-page',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/right-arrow.svg')
    );

    this.matIconRegistry.addSvgIcon(
      'drop-down',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/down-arrow.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'loader',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/loader.svg')
    );
    this.userData = Helpers.getUserData();
  }

  ngOnInit() {
  }

  getBackgroundImageUrl() {
    return `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0)),url(${this.coverImageUrl})`;
  }


  ngOnChanges(changes: SimpleChanges): void {
    this.loadVideos = true;
    this.videos = [];
    this.notPaid = false;
    if (changes.category) {
      this.page = 0;
      this.orderBy = '';
      this.currentCategory = changes.category.currentValue.categoryCode;
      this.coverImageUrl = changes.category.currentValue.coverImageUrl;
      this.checkPayTvSubscriptionStatus(changes.category.currentValue.categoryCode);
    }
  }

  onMetadata(e, index) {
    this.duration[index] = parseInt(e.target.duration, 10);
  }

  fetchVideos(category) {
    this.videosService.getAllVideos(
      this.page, this.limit,
      {CategoryId: category},
      {OrderBy: this.orderBy}
      ).subscribe(res => {
      this.videos = res.videos;
      this.pageCount = res.pageCount;
      this.loadVideos = false;
    });
  }

  playVideo(event) {
    this.videoToBePlayed.emit(event);
  }

  previousPage() {
    if (this.page < 1) {
      return;
    } else {
      this.page = this.page - 1;
      this.loadVideos = false;
      this.fetchVideos(this.currentCategory);
    }
  }

  nextPage() {
    if (this.page >= (this.pageCount - 1)) {
      return;
    } else {
      this.page = this.page + 1;
      this.loadVideos = false;
      this.fetchVideos(this.currentCategory);
    }
  }

  ascendingOrder() {
    this.orderBy = 'ASC';
    this.loadVideos = false;
    this.fetchVideos(this.currentCategory);
  }

  descendingOrder() {
    this.orderBy = 'DESC';
    this.loadVideos = false;
    this.fetchVideos(this.currentCategory);
  }

  checkPayTvSubscriptionStatus(category) {
    this.subscriptionService.checkPayTvSubscriptionStatus(
      {UserId: this.userData.userId, CategoryId: category}
    ).subscribe(res => {
      if (res.status.statusCode === '0') {
        this.fetchVideos(this.currentCategory);
      } else if (res.status.statusCode === '205') {
        this.openDialog(res);
      }
    });
  }

  openDialog(res): void {
    const dialogRef = this.dialog.open(PaymentModalComponent, {
      width: '400px',
      data: { amount: res.subscriptionAmount, currency: res.subscriptionCurrency, error: res.status.statusDesc}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'pay') {
      this.payWithRave(res.orderDetails.id, res.subscriptionAmount, res.subscriptionCurrency);
      } else {
        this.notPaid = true;
      }
    });
  }

  payWithRave(transactionId, amount, currency) {
    const x = getpaidSetup({
      amount,
      txref: transactionId,
      PBFPubKey: environment.rave_publicKey,
      customer_email: this.userData.userId,
      currency,
      onClose: () => {},
      callback: (response) => {
        const txref = response.tx.txRef;
        const flutterwaveRef = response.tx.flwRef;
        if (response.tx.chargeResponseCode === '00' || response.tx.chargeResponseCode === '0') {
          this.verifyPayment({OriginalOrderRef: txref, FlutterWaveRef: flutterwaveRef});
        } else {
          window.location.replace(`${window.location.href}?payment=Fail`);
        }
      }
    });
  }

  verifyPayment = (data) => {
    this.orderService.verifyFlutterWavePayment(data).subscribe((res: any) => {
      if (res.statusCode === '0') {
        window.location.replace(`${window.location.href}?payment=Success`);
      } else {
        window.location.replace(`${window.location.href}?paymentVerification=Fail`);
      }
    });
  }



}
