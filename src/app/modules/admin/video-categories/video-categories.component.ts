import { Component, OnInit } from '@angular/core';
import {SystemSettingModalComponent} from '../../shared/system-setting-modal/system-setting-modal.component';
import {MatDialog} from '@angular/material/dialog';
import {VideoCategoriesModalComponent} from '../../shared/video-categories-modal/video-categories-modal.component';
import {VideoCategoriesService} from '../../../services/videoCategories/video-categories.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {environment} from '../../../../environments/environment';
import Helpers from '../../../helpers/helpers';
import {ModalComponent} from '../../shared/modal/modal.component';

declare var cloudinary: any;
@Component({
  selector: 'app-video-categories',
  templateUrl: './video-categories.component.html',
  styleUrls: ['./video-categories.component.scss']
})
export class VideoCategoriesComponent implements OnInit {

  dummyData = [{
    id: '0',
    categoryCode: 'Enter category name here...',
    coverImageUrl: 'Enter cover image url here...'
  }];
  data = [];
  userData;
  savedItemId;
  deletedItemId;
  displayedColumns = ['categoryCode', 'coverImageUrl', 'update', 'delete'];
  categoryCode = '';
  coverImageUrl = '';
  savingVideoCategory = false;
  deletingVideoCategory = false;
  loadVideoCategories = true;
  availableVideoCategories = [];
  updatedCategoryName = false;
  updateCoverImageUrl = false;
  constructor(
    public dialog: MatDialog,
    private videoCategoriesService: VideoCategoriesService,
    private snackBar: MatSnackBar,
    ) {
    this.userData = Helpers.getUserData();
  }

  ngOnInit(): void {
    this.getAllVideoCategories();
  }

  addCategoryName(categoryId, categoryCode) {
    const categoryName = categoryId !== '0' ? categoryCode : '';
    const dialogRef = this.dialog.open(VideoCategoriesModalComponent, {
      width: '450px', height: '260px',
      data: { action: 'categoryCode', categoryCode: categoryName}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.reply === 'confirm categoryCode') {
        this.categoryCode = result.returnedValue;
        const index = this.data.findIndex((category => category.id === categoryId));
        this.data[index].categoryCode = this.categoryCode;
        if (categoryId === '0' && result.returnedValue !== '') {
          this.updatedCategoryName = true;
        } else if (categoryId === '0' && result.returnedValue === '') {
          this.updatedCategoryName = false;
        }
      } else if (result.reply === 'cancel categoryCode') {
      }
    });
  }

  upload(id) {
    const myWidget = cloudinary.createUploadWidget({
        cloudName: 'do6g6dwlz',
        uploadPreset: 'vdoc0rsk',
        multiple: false,
        maxImageFileSize: environment.maxImageFileSize
      }, (error, result) => {
        if (!error && result && result.event === 'success') {
          this.coverImageUrl = result.info.secure_url;
          id === '0' ? this.updateCoverImageUrl = true : null;
          const index = this.data.findIndex((category => category.id === id));
          this.data[index].coverImageUrl = this.coverImageUrl;
        }
      }
    );

    myWidget.open();
  }

  createVideoCategory(id) {
    this.savedItemId = id;
    this.savingVideoCategory = true;
    const index = this.data.findIndex((category => category.id === id));
    this.videoCategoriesService.createVideoCategory(this.data[index]).subscribe(res => {
      this.savingVideoCategory = false;

      if (res.statusCode === '0') {
        if (id === '0') {
          this.data[index].id = res.id;
          this.data = [
            ...this.data,
            {
            id: '0',
            categoryCode: 'Enter category name here...',
            coverImageUrl: 'Enter cover image url here...'
          }];
        }
        const action = id !== '0' ? 'updated' : 'created';
        this.snackBar.open(`You have successfully ${action} a new video category.` + '', '', {
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

  getAllVideoCategories() {
    this.videoCategoriesService.getAllVideoCategories(0, 100, this.userData.userId).subscribe(res => {
      this.loadVideoCategories = false;
      this.availableVideoCategories = res.items;
      this.data = [...res.items, ...this.dummyData];
    });
  }

  deleteCategory(id) {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '500px', height: '200px',
      data: { dataType: 'video category'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'delete video category') {
        this.deleteVideoCategory(id);
      }});
  }

  deleteVideoCategory(id) {
    this.deletedItemId = id;
    this.deletingVideoCategory = true;
    this.videoCategoriesService.deleteVideoCategory(id).subscribe(res => {
      this.deletingVideoCategory = false;
      if (res.statusCode === '0') {
        this.data = this.data.filter((category => category.id !== id));
        this.snackBar.open(`You have successfully deleted a video category.` + '', '', {
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
