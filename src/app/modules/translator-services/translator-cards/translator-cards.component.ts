import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-translator-cards',
  templateUrl: './translator-cards.component.html',
  styleUrls: ['./translator-cards.component.scss']
})
export class TranslatorCardsComponent implements OnInit {


  @Input() data: any;
  loadingProfileImage = true;
  constructor() { }

  ngOnInit(): void {
  }

}
