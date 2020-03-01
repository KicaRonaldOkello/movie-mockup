import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ad-component',
  templateUrl: './ad-component.component.html',
  styleUrls: ['./ad-component.component.scss']
})
export class AdComponentComponent implements OnInit {


  displayComments = false;
  constructor(private router: Router) { }


  ngOnInit() {
    this.router.events.subscribe((event) => {
      if(event['url']) {
          this.checkRoute(event['url']);
          console.log(event['url']);
      }
  });
  }

  checkRoute(url) {
    if (url.startsWith('/tv')) {
      this.displayComments = true;
  } else {
    this.displayComments = false;
  }

}

}
