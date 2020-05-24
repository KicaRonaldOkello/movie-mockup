import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import Helpers from 'src/app/helpers/helpers';
import { ShareDataService } from 'src/app/services/share-data/share-data.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  username = 'Hello Sign In';
  iconLoaded = 'assets/screen.svg';
  showSignout: boolean;
  isAdmin: boolean;
  constructor(
    private router: Router,
    private shareDataService: ShareDataService,
    public translate: TranslateService,
    ) {

    translate.addLangs(['en', 'fr']);
    translate.setDefaultLang('en');
    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');

    this.shareDataService.username.subscribe(res => {
      if (res === 'true') {
        const userData = Helpers.getUserData();
        this.username = userData.authToken.userId;
        this.isAdmin = userData.roleId.toUpperCase() === 'ADMIN' ? true : false;
        this.showSignout = true;
      }
    })
  }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event['url']) {
          this.changeNavBarIcon(event['url']);
      }
  });
  if (Helpers.getUserData()) {
    const userData = Helpers.getUserData();
    this.username = userData.authToken.userId;
    this.isAdmin = userData.roleId.toUpperCase() === 'ADMIN' ? true : false;
    this.showSignout = true;
  } else {
    this.showSignout = false;
  }
    this.shareDataService.logoutState.subscribe(res => {
      if (res === 'true') {
        this.isAdmin = false;
      }
    });
  }

  changeNavBarIcon(navBarItem) {
    if (navBarItem.startsWith('/tv')) {
      this.iconLoaded = 'assets/blog.svg';
    } else if (navBarItem.startsWith('/blog')) {
      this.iconLoaded = 'assets/blog.svg';
    } else if (navBarItem.startsWith('/investor-matching')) {
      this.iconLoaded = 'assets/blog.svg';
    }
  }

  login() {
    if(!Helpers.getUserData()) {
    this.router.navigateByUrl('/auth');
    }
  }

  logout() {
    this.username = 'Hello Sign In';
    Helpers.deleteUserData();
    this.router.navigateByUrl('/');
    this.showSignout = false;
    this.isAdmin = false;
    this.shareDataService.loggedOut();
  }

}
