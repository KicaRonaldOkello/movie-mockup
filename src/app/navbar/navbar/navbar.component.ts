import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  iconLoaded = 'assets/screen.svg';
  constructor(private router: Router, public translate: TranslateService) {

    translate.addLangs(['en', 'fr']);
    translate.setDefaultLang('en');
    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');
  }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if(event['url']) {
          this.changeNavBarIcon(event['url']);
      }
  });
  }

  changeNavBarIcon(navBarItem) {
    if (navBarItem.startsWith('/tv')) {
      this.iconLoaded = 'assets/screen.svg';
    } else if (navBarItem.startsWith('/blog')) {
      this.iconLoaded = 'assets/blog.svg';
    } else if (navBarItem.startsWith('/investor-matching')) {
      this.iconLoaded = 'assets/investor.svg'
    }
  }

  login() {
    this.router.navigateByUrl('/auth');
  }

}
