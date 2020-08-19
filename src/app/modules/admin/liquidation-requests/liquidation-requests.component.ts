import { Component, OnInit } from '@angular/core';
import {LiquidationService} from '../../../services/liquidation/liquidation.service';
import {MatDialog} from '@angular/material/dialog';
import {ImageModalComponent} from '../../shared/image-modal/image-modal.component';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {UserModalComponent} from '../../shared/user-modal/user-modal.component';
import {LiquidationRequestModalComponent} from '../../shared/liquidation-request-modal/liquidation-request-modal.component';
import {environment} from '../../../../environments/environment';
import Helpers from '../../../helpers/helpers';
import {MatSnackBar} from '@angular/material/snack-bar';

declare var cloudinary: any;
@Component({
  selector: 'app-liquidation-requests',
  templateUrl: './liquidation-requests.component.html',
  styleUrls: ['./liquidation-requests.component.scss']
})
export class LiquidationRequestsComponent implements OnInit {

  usersForm: FormGroup;
  data;
  receiptUrl;
  pageCount;
  length;
  defaultOption = '';
  limit = 50;
  page = 0;
  userData;
  loadingTableData = true;
  actions: string[] = [
    'COMPLETE',
    'REJECT'
  ];
  displayedColumns = [
    'requesterId',
    'kycIDNumber',
    'kycIDUrl',
    'amount',
    'liquidationStatus',
    'reason',
    'phoneNumber',
    'liquidationChannelAccountDetails',
    'actions',
  ];
  constructor(
    private liquidationService: LiquidationService,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    ) {
    this.userData = Helpers.getUserData();
  }

  ngOnInit(): void {
    this.getAllLiquidations({});
    this.usersForm = this.fb.group({
      requesterId: [''],
      liquidationStatus: ['']
    });
  }


  getAllLiquidations(searchData) {
    this.liquidationService.getAllLiquidations({...searchData, limit: this.limit, page: this.page}).subscribe(res => {
      this.loadingTableData = false;
      this.data = res.items;
      this.pageCount = res.pageCount;
      this.length = res.pageCount > 0 ? (this.limit * this.pageCount) : this.data.length;
    });
  }

  zoomImage(imageUrl) {
    const dialogRef = this.dialog.open(ImageModalComponent, {
      width: '80vw', height: '80vh',
      data: {imageUrl},
      panelClass: 'my-dialog'
    });
  }

  searchTransactions() {
    this.getAllLiquidations(this.usersForm.value);
  }


  nextOrPreviousPage(event) {
    if (event.pageIndex < event.previousPageIndex) {
      this.page = this.page - 1;
      this.getAllLiquidations({});
    } else {
      this.page = this.page + 1;
      this.getAllLiquidations({});
    }
  }

  closeLiquidationRequest(request, requestId) {
    if (request === 'COMPLETE') {
      const dialogRef = this.dialog.open(LiquidationRequestModalComponent, {
        width: '600px', height: '200px',
        data: { action: request }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result.reply === 'complete no') {
          // this.deletedItemId.emit(id);
          // this.defaultOption = '';
        } else if (result.reply === 'complete yes') {
          this.upload(requestId);
        }
      });
    } else if (request === 'REJECT') {
      const dialogRef = this.dialog.open(LiquidationRequestModalComponent, {
        width: '500px', height: '260px',
        data: { action: request }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result.reply === 'reject no') {
          // this.deletedItemId.emit(id);
          // this.defaultOption = '';
        } else if (result.reply === 'reject yes') {
          // this.upload(requestId);
          const data = {
            liquidationStatus: 'FAILED',
            reason: result.reason,
            originalInitiateLiquidationRequestId: requestId,
            completedBy: this.userData.userId,
            receiptUrl: ''
          };
          this.completeLiquidation(data);
        }
      });
    }
  }

  upload(requestId) {
    const myWidget = cloudinary.createUploadWidget({
        cloudName: 'do6g6dwlz',
        uploadPreset: 'vdoc0rsk',
        maxImageFileSize: environment.maxImageFileSize,
        multiple: false
      }, (error, result) => {
        if (!error && result && result.event === 'success') {
          this.receiptUrl = result.info.secure_url;

          const data = {
            liquidationStatus: 'SUCCESS',
            reason: '',
            originalInitiateLiquidationRequestId: requestId,
            completedBy: this.userData.userId,
            receiptUrl: this.receiptUrl
          };
          this.completeLiquidation(data);
        }
      }
    );

    myWidget.open();
  }

  completeLiquidation(data) {
    this.liquidationService.completeLiquidation(data).subscribe(res => {
      if (res.statusCode === '0') {
        const objIndex = this.data.findIndex((obj => obj.id === data.originalInitiateLiquidationRequestId));
        this.data[objIndex].liquidationStatus = data.liquidationStatus;
        const completedAction = data.liquidationStatus === 'SUCCESS' ? 'approved' : 'rejected';
        this.snackBar.open(`You have successfully ${completedAction} this liquidation request` + '', '', {
          duration: 3000,
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
