import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-blog-card',
  templateUrl: './blog-card.component.html',
  styleUrls: ['./blog-card.component.scss']
})
export class BlogCardComponent implements OnInit {

  @Input() data: any
  constructor() { }

  ngOnInit() {
  }

  truncateHTML(text: string): string {

    let charlimit = 300;
    if(!text || text.length <= charlimit )
    {
        return text;
    }


  let without_html = text.replace(/<(?:.|\n)*?>/gm, '');
  let shortened = without_html.substring(0, charlimit) + "...";
  return shortened;
}

}
