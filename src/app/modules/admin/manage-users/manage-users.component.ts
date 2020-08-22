import { Component, OnInit } from '@angular/core';
import {UsersService} from '../../../services/users/users.service';
import {ShareDataService} from '../../../services/share-data/share-data.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss']
})
export class ManageUsersComponent implements OnInit {
  users = [];
  roles = [];
  loadingUsers = true;
  usersForm: FormGroup;
  limit = 12;
  pageCount;
  page = 0;
  constructor(
    private usersService: UsersService,
    private shareDataService: ShareDataService,
    private fb: FormBuilder,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private snackBar: MatSnackBar,
  ) {
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
    this.getUsers({});
    this.getUserRoles();
    this.usersForm = this.fb.group({
      name: [''],
      userId: [''],
      role: ['']
    });
  }

  getUsers(userInfo) {
    this.usersService.getUserByName({page: this.page, limit: this.limit, ...userInfo}).subscribe(res => {
      this.loadingUsers = false;
      this.users = res.items;
      this.pageCount = res.pageCount;
      this.shareDataService.showUserInfo('true');
    });
  }

  searchUsers() {
    this.loadingUsers = true;
    this.getUsers(this.usersForm.value);
  }

  getUserRoles() {
    this.usersService.getAllUserRoles().subscribe(res => {
      this.roles = res.items;
    });
  }

  selectRole(value) {
    this.usersForm.patchValue({role: value});
  }

  nextPage() {
    if (this.page < this.pageCount) {
      this.page = this.page + 1;
      this.loadingUsers = true;
      this.getUsers({});
    }
  }

  previousPage() {
    if (this.page > 0) {
      this.page = this.page - 1;
      this.loadingUsers = true;
      this.getUsers({});
    }
  }

  addOrRemoveAdmin(data) {
    this.usersService.addOrRemoveAdmin(data).subscribe(res => {
      if (res.statusCode === '0') {
        this.snackBar.open('You have successfully updated the user\'s privilege' + '', '', {
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

  blockOrUnblockUser(data) {
    this.usersService.blockOrUnblockUser(data).subscribe(res => {
      const blockState = data.isBlocked ? 'blocked' : 'unblocked';
      if (res.statusCode === '0') {
        this.snackBar.open(`You have successfully ${blockState} this user.` + '', '', {
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
