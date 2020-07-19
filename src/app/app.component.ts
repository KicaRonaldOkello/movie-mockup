import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ShareDataService } from './services/share-data/share-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'mockup';
  showNavBar = false;
  displayAdComponent: any = false;
  constructor(private router: Router, private shareDataService: ShareDataService) {
  }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if(event['url']) {
          this.checkRoute(event['url']);
      }
  });

  this.shareDataService.displayAdComponent.subscribe(res => {
    if (res === 'true') {
      this.displayAdComponent = res;
    };
  });

  console.log('called>>>>>>>>>>>>>>>>>>>>>>>>');

  }

  checkRoute(url) {
    if (url.startsWith('/admin')) {
      this.showNavBar = false;
  } else {
    this.showNavBar = true;
  }

}
}
