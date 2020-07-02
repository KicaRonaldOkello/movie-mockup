import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ShareDataService} from '../../../services/share-data/share-data.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-tours',
  templateUrl: './tours.component.html',
  styleUrls: ['./tours.component.scss'],
})
export class ToursComponent implements OnInit {
  toursForm: FormGroup;
  toursData = Array(9);

  constructor(
    private shareDataService: ShareDataService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.shareDataService.showAd('false');
  }

  ngOnInit(): void {
    this.router.events.subscribe((ev) => {
     window.location.reload();
    })
    this.toursForm = this.fb.group({
      username: [''],
      location: [''],
      amountMin: [''],
      amountMax: [''],
      returnsMin: [''],
      returnsMax: ['']
    });
  }


  isNumber(evt) {
    const theEvent = evt || window.event;
    let key = theEvent.keyCode || theEvent.which;
    key = String.fromCharCode(key);
    if (key.length === 0) { return; }
    const regex = /^[0-9,\b]+$/;
    if (!regex.test(key)) {
      theEvent.returnValue = false;
      if (theEvent.preventDefault) { theEvent.preventDefault(); }
    }
  }

  addCommas(value, inputField) {
    if (value === '') {
      this.toursForm.patchValue({ [inputField]: value });
    } else {
      const num1 = value.replace(/,/g, '');
      const num2 = Number(num1).toLocaleString('en-US');
      this.toursForm.patchValue({ [inputField]: num2 });
    }
  }

  searchInvestmentProject() {

  }
}
