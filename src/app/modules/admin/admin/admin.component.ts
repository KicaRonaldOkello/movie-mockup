import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  loadManageBlog = true;
  loadManageVideo = false;
  loadManagePlaylist = false;
  loadManageUsers = false;
  displayAdminComponent = true;
  smallScreensize = false;
  loadManageLiquidationRequests = false;
  loadManagePayments = false;
  loadManageSystemSettings = false;
  loadManageVideoCategories = false;
  modes = 'side';
  constructor(private cdRef: ChangeDetectorRef, public breakpointObserver: BreakpointObserver) {
  }

  ngOnInit() {
    this.breakpointObserver.observe(['(max-width: 975px)']).subscribe(state => {
      if (state.matches) {
        this.smallScreensize = true;
        this.modes = 'over';
      } else {
        document.getElementById('toggleButton').click();
        this.modes = 'side';
        this.smallScreensize = false;
      }
    });

    setTimeout(() => {
      this.displayAdminComponent = false;
    }, 3000);
  }



  loadBlog() {
    window.scroll(0, 0);
    this.loadManageBlog = true;
    this.loadManageVideo = false;
    this.loadManagePlaylist = false;
    this.loadManageUsers = false;
    this.loadManageLiquidationRequests = false;
    this.loadManagePayments = false;
    this.loadManageSystemSettings = false;
    this.loadManageVideoCategories = false;
  }

  loadVideo() {
    window.scroll(0, 0);
    this.loadManageVideo = true;
    this.loadManageBlog = false;
    this.loadManagePlaylist = false;
    this.loadManageUsers = false;
    this.loadManageLiquidationRequests = false;
    this.loadManagePayments = false;
    this.loadManageSystemSettings = false;
    this.loadManageVideoCategories = false;
  }

  loadPlaylist() {
    window.scroll(0, 0);
    this.loadManagePlaylist = true;
    this.loadManageVideo = false;
    this.loadManageBlog = false;
    this.loadManageUsers = false;
    this.loadManageLiquidationRequests = false;
    this.loadManagePayments = false;
    this.loadManageSystemSettings = false;
    this.loadManageVideoCategories = false;
  }

  loadUsers() {
    window.scroll(0, 0);
    this.loadManageUsers = true;
    this.loadManagePlaylist = false;
    this.loadManageVideo = false;
    this.loadManageBlog = false;
    this.loadManageLiquidationRequests = false;
    this.loadManagePayments = false;
    this.loadManageSystemSettings = false;
    this.loadManageVideoCategories = false;
  }

  loadLiquidationRequests() {
    window.scroll(0, 0);
    this.loadManageLiquidationRequests = true;
    this.loadManageUsers = false;
    this.loadManagePlaylist = false;
    this.loadManageVideo = false;
    this.loadManageBlog = false;
    this.loadManagePayments = false;
    this.loadManageSystemSettings = false;
    this.loadManageVideoCategories = false;
  }

  loadPayments() {
    window.scroll(0, 0);
    this.loadManageLiquidationRequests = false;
    this.loadManageUsers = false;
    this.loadManagePlaylist = false;
    this.loadManageVideo = false;
    this.loadManageBlog = false;
    this.loadManagePayments = true;
    this.loadManageSystemSettings = false;
    this.loadManageVideoCategories = false;
  }

  loadSystemSettings() {
    window.scroll(0, 0);
    this.loadManageLiquidationRequests = false;
    this.loadManageUsers = false;
    this.loadManagePlaylist = false;
    this.loadManageVideo = false;
    this.loadManageBlog = false;
    this.loadManagePayments = false;
    this.loadManageSystemSettings = true;
    this.loadManageVideoCategories = false;
  }

  loadVideoCategories() {
    window.scroll(0, 0);
    this.loadManageLiquidationRequests = false;
    this.loadManageUsers = false;
    this.loadManagePlaylist = false;
    this.loadManageVideo = false;
    this.loadManageBlog = false;
    this.loadManagePayments = false;
    this.loadManageSystemSettings = false;
    this.loadManageVideoCategories = true;
  }
}
