import {AfterViewInit, Component, OnInit} from '@angular/core';
import { ShareDataService } from 'src/app/services/share-data/share-data.service';
import { InvestmentProjectService } from 'src/app/services/investment-project/investment-project.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import {OrderService} from '../../../services/order/order.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ActivatedRoute} from '@angular/router';
import Helpers from '../../../helpers/helpers';

@Component({
  selector: 'app-dispplay-clients',
  templateUrl: './dispplay-clients.component.html',
  styleUrls: ['./dispplay-clients.component.scss']
})
export class DispplayClientsComponent implements OnInit {

  loadingInvestmentProjects = true;
  page = 0;
  userData;
  pageCount: number;
  data = [];
  limit = 12;
  projectsForm: FormGroup;
  timeoutError = false;
  payment;
  loadingPage = true;
  constructor(
    private shareDataService: ShareDataService,
    private fb: FormBuilder,
    private orderService: OrderService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private getAllInvestmentProjectsService: InvestmentProjectService,
    ) {
    this.shareDataService.showAd('true');
    this.shareDataService.paginateInvestmentProject.subscribe(page => {
      if (page !== '') {
        this.loadingInvestmentProjects = true;
        this.page = Number(page);
        this.getAllInvestmentProjects({});
      }
    });
    this.shareDataService.deletedProjectId.subscribe(res => {
      if (res !== '') {
        this.deleteProject(res);
      }
    });
    this.userData = Helpers.getUserData();
  }

  ngOnInit() {
   this.getAllInvestmentProjects({});
   this.projectsForm = this.fb.group({
     username: [''],
     location: [''],
     amountMin: [''],
     amountMax: [''],
     returnsMin: [''],
     returnsMax: [''],
     ownerId: [''],
   });

   this.payment = this.route.snapshot.queryParamMap.get('payment');
   this.successMessage();
   history.pushState(null, '', location.href.split('?')[0]);
  }

  getAllInvestmentProjects(queryParams) {
    this.getAllInvestmentProjectsService.getAllInvestmentProjects(this.page, this.limit, queryParams).subscribe(res => {
      this.loadingInvestmentProjects = false;
      this.loadingPage = false;
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

  isChecked(event) {
    if (event.checked) {
      this.projectsForm.patchValue({
        ownerId: this.userData.userId
      });
    } else {
      this.projectsForm.patchValue({
        ownerId: ''
      });
    }
  }

  searchInvestmentProject() {
    this.loadingInvestmentProjects = true;
    let { amountMax, amountMin, returnsMax, returnsMin } = this.projectsForm.value;
    const { location, username, ownerId } = this.projectsForm.value;
    if (amountMin !== '') {
      amountMin = amountMin.replace(/\,/g, '');
    }
    if (amountMax !== '') {
      amountMax = amountMax.replace(/\,/g, '');
    }
    if (returnsMin !== '') {
      returnsMin = returnsMin.replace(/\,/g, '');
    }
    if (returnsMax !== '') {
      returnsMax = returnsMax.replace(/\,/g, '');
    }
    const data = {
      userId: ownerId,
      Title: username,
      Location: location,
      AmountRequested: `${amountMin}-${amountMax}`,
      Returns: `${returnsMin}-${returnsMax}`

    };
    this.page = 0;
    this.getAllInvestmentProjects(data);
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
      this.projectsForm.patchValue({ [inputField]: value });
    } else {
    const num1 = value.replace(/,/g, '');
    const num2 = Number(num1).toLocaleString('en-US');
    this.projectsForm.patchValue({ [inputField]: num2 });
    }
  }

  successMessage() {
    if (this.payment === 'Success') {
      this.snackBar.open('Your payment has been successful', '', {
        duration: 5000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
        panelClass: ['green-snackbar']
      });
    }
  }

  deleteProject(id) {
    this.getAllInvestmentProjectsService.deleteInvestmentProject(id).subscribe(res => {
      if (res.statusCode === '0') {
        this.data = this.data.filter((item) => item.id !== id);
        this.snackBar.open('Investment project deleted successfully.', '', {
          duration: 5000,
          verticalPosition: 'bottom',
          horizontalPosition: 'center',
          panelClass: ['green-snackbar']
        });
      } else {
        this.snackBar.open(res.statusDesc, '', {
          duration: 6000,
          panelClass: ['red-snackbar']
        });
      }
    });
  }

}
