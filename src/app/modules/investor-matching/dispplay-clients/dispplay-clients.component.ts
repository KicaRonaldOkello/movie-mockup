import { Component, OnInit } from '@angular/core';
import { ShareDataService } from 'src/app/services/share-data/share-data.service';
import { InvestmentProjectService } from 'src/app/services/investment-project/investment-project.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dispplay-clients',
  templateUrl: './dispplay-clients.component.html',
  styleUrls: ['./dispplay-clients.component.scss']
})
export class DispplayClientsComponent implements OnInit {

  loadingInvestmentProjects = true;
  page: number = 0;
  pageCount: number;
  data = [];
  limit =12;
  projectsForm: FormGroup;
  timeoutError = false;
  constructor(
    private shareDataService: ShareDataService,
    private fb: FormBuilder,
    private getAllInvestmentProjectsService: InvestmentProjectService,) {
    this.shareDataService.showAd('true');
    this.shareDataService.paginateInvestmentProject.subscribe(page => {
      if (page !== '') {
        this.loadingInvestmentProjects = true;
        this.page = Number(page);
        this.getAllInvestmentProjects({});
      }
    })
  }

  ngOnInit() {
   this.getAllInvestmentProjects({});
   this.projectsForm = this.fb.group({
     username: [''],
     location: [''],
     amountMin: [''],
     amountMax: [''],
     returnsMin: [''],
     returnsMax: ['']
   })
  }

  getAllInvestmentProjects(queryParams) {
    this.getAllInvestmentProjectsService.getAllInvestmentProjects(this.page, this.limit, queryParams).subscribe(res => {
      this.loadingInvestmentProjects = false;
      this.data = res.projects;
      this.pageCount = res.pageCount;
    },
    (error) => {
      this.timeoutError = true;
    });
  }

  reloadInvestmentProjects() {
    this.timeoutError = false;
    this.getAllInvestmentProjects({});

  }

  searchInvestmentProject() {
    this.loadingInvestmentProjects = true;
    let { location, username, amountMax, amountMin, returnsMax, returnsMin } = this.projectsForm.value;
    if (amountMin !== '') {
      amountMin = amountMin.replace(/\,/g,'');
    }
    if (amountMax !== '') {
      amountMax = amountMax.replace(/\,/g,'');
    }
    if (returnsMin !== '') {
      returnsMin = returnsMin.replace(/\,/g,'');
    }
    if (returnsMax !== '') {
      returnsMax = returnsMax.replace(/\,/g,'');
    }
    const data ={
      Title: username,
      Location: location,
      AmountRequested: `${amountMin}-${amountMax}`,
      Returns: `${returnsMin}-${returnsMax}`
      
    }
    this.getAllInvestmentProjects(data);
  }

  isNumber(evt) {
    var theEvent = evt || window.event;
    var key = theEvent.keyCode || theEvent.which;
    key = String.fromCharCode(key);
    if (key.length == 0) return;
    var regex = /^[0-9,\b]+$/;
    if (!regex.test(key)) {
        theEvent.returnValue = false;
        if (theEvent.preventDefault) theEvent.preventDefault();
      }
  }

  addCommas(value, inputField) {
    if (value === '') {
      this.projectsForm.patchValue({ [inputField]: value })
    } else {
    const num1 = value.replace(/,/g, '');
      const num2 = Number(num1).toLocaleString('en-US');
      this.projectsForm.patchValue({ [inputField]: num2 })
    }
  }


}
