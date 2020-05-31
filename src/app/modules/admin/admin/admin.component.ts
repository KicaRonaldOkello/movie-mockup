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
  displayAdminComponent = true;
  smallScreensize = false;
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
    this.loadManageBlog = true;
    this.loadManageVideo = false;
    this.loadManagePlaylist = false;
  }

  loadVideo() {
    this.loadManageVideo = true;
    this.loadManageBlog = false;
    this.loadManagePlaylist = false;
  }

  loadPlaylist() {
    this.loadManagePlaylist = true;
    this.loadManageVideo = false;
    this.loadManageBlog = false;
  }
}
