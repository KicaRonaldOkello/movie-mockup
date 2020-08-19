import { Component, OnInit } from '@angular/core';
import {SystemSettingModalComponent} from '../../shared/system-setting-modal/system-setting-modal.component';
import {MatDialog} from '@angular/material/dialog';
import {VideoCategoriesModalComponent} from '../../shared/video-categories-modal/video-categories-modal.component';
import {VideoCategoriesService} from '../../../services/videoCategories/video-categories.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {environment} from '../../../../environments/environment';

declare var cloudinary: any;
@Component({
  selector: 'app-video-categories',
  templateUrl: './video-categories.component.html',
  styleUrls: ['./video-categories.component.scss']
})
export class VideoCategoriesComponent implements OnInit {

  data = [{
    createVideoCategory: 'Creat Video Category',
    categoryCode: 'Enter category name here...',
    coverImageUrl: 'Enter cover image url here...'
  }];
  displayedColumns = ['createVideoCategory', 'categoryCode', 'coverImageUrl', 'update'];
  categoryCode = '';
  coverImageUrl = '';
  savingVideoCategory = false;
  constructor(
    public dialog: MatDialog,
    private videoCategoriesService: VideoCategoriesService,
    private snackBar: MatSnackBar,
    ) { }

  ngOnInit(): void {
  }

  addCategoryName() {
    const dialogRef = this.dialog.open(VideoCategoriesModalComponent, {
      width: '450px', height: '260px',
      data: { action: 'categoryCode'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.reply === 'confirm categoryCode') {
        this.categoryCode = result.returnedValue;
        this.data[0].categoryCode = this.categoryCode;
      } else if (result.reply === 'cancel categoryCode') {
      }
    });
  }

  upload() {
    const myWidget = cloudinary.createUploadWidget({
        cloudName: 'do6g6dwlz',
        uploadPreset: 'vdoc0rsk',
        multiple: false,
        maxImageFileSize: environment.maxImageFileSize
      }, (error, result) => {
        if (!error && result && result.event === 'success') {
          this.coverImageUrl = result.info.secure_url;
          this.data[0].coverImageUrl = this.coverImageUrl;
        }
      }
    );

    myWidget.open();
  }

  createVideoCategory() {
    this.savingVideoCategory = true;
    this.videoCategoriesService.createVideoCategory({id: '0', categoryCode: this.categoryCode, coverImageUrl: this.coverImageUrl}).subscribe(res => {
      this.savingVideoCategory = false;
      if (res.statusCode === '0') {
        this.data[0].coverImageUrl = '';
        this.data[0].categoryCode = '';
        this.snackBar.open(`You have successfully created a new video category.` + '', '', {
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
