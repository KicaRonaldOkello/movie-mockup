import {AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
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
  selectedLanguage;
  isAdmin: boolean;
  currentUrl;
  chosenLanguage;
  language;
  @ViewChild('toggle') toggleOpen: ElementRef;
  constructor(
    private router: Router,
    private shareDataService: ShareDataService,
    ) {
    this.shareDataService.username.subscribe(res => {
      if (res === 'true') {
        const userData = Helpers.getUserData();
        this.username = userData.authToken.userId;
        this.isAdmin = userData.roleId.toUpperCase() === 'ADMIN' ? true : false;
        this.showSignout = true;
      }
    });
  }


  ngOnInit() {
    if (Helpers.getChosenLanguage()) {
      this.language = Helpers.getChosenLanguage();
    } else {
      this.language = '#googtrans(en|en)';
    }

    this.setLanguageCookie(this.language);
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

    this.changeLanguageKey(this.language);
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
    if (!Helpers.getUserData()) {
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

  changeLanguage(language) {
    this.changeLanguageKey(language);
    Helpers.saveChosenLanguage(language);
    history.pushState(null, '', location.href.split('#')[0] + language);
    this.setLanguageCookie(language);
    window.location.reload();
  }


  toggleDropDown() {
    this.toggleOpen.nativeElement.classList.toggle('open');
  }

@HostListener('window:click', ['$event'])
  checkClick(e) {
    if (!this.toggleOpen.nativeElement.contains(e.target)) {
      this.toggleOpen.nativeElement.classList.remove('open');
    }
}

changeLanguageKey(value) {
    if (value === '#googtrans(en|en)') {
      this.selectedLanguage = 'ENG';
    } else if (value === '#googtrans(en|fr)') {
      this.selectedLanguage = 'FR';
    } else if (value === '#googtrans(en|zh-CN)') {
      this.selectedLanguage = 'CHI';
    } else if (value === '#googtrans(en|ja)') {
      this.selectedLanguage = 'JPN';
    }
}

  setLanguageCookie(value) {
    const domain = this.domain();
    if (value === '#googtrans(en|en)') {
      document.cookie = 'googtrans=/en/en';
      document.cookie = 'googtrans=/en/en; path=/; domain=' + domain;
    } else if (value === '#googtrans(en|fr)') {
      document.cookie = 'googtrans=/en/fr';
      document.cookie = 'googtrans=/en/fr; path=/; domain=' + domain;
    } else if (value === '#googtrans(en|zh-CN)') {
      document.cookie = 'googtrans=/en/zh-CN';
      document.cookie = 'googtrans=/en/zh-CN; path=/; domain=' + domain;
    } else if (value === '#googtrans(en|ja)') {
      document.cookie = 'googtrans=/en/ja';
      document.cookie = 'googtrans=/en/ja; path=/; domain=' + domain;
    }
  }

  domain() {
    let i = 0, domain = document.domain, p = domain.split('.'), s = '_gd' + (new Date()).getTime();
    while (i < (p.length - 1) && document.cookie.indexOf(s + '=' + s) === -1) {
      domain = p.slice(-1 - (++i)).join('.');
      document.cookie = s + '=' + s + ';domain=' + domain + ';';
    }
    document.cookie = s + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;domain=' + domain + ';';
    return domain;
  }
}
