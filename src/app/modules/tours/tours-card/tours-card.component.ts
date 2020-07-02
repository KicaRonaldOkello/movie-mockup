import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-tours-card',
  templateUrl: './tours-card.component.html',
  styleUrls: ['./tours-card.component.scss']
})
export class ToursCardComponent implements OnInit {

  @Input() data: any;
  constructor() { }
  ngOnInit(): void {
  }

}
