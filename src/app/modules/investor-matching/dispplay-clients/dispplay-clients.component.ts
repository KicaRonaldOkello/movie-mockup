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
  constructor(
    private shareDataService: ShareDataService,
    private fb: FormBuilder,
    private getAllInvestmentProjectsService: InvestmentProjectService,) {
    this.shareDataService.showAd('true');
    this.shareDataService.paginateInvestmentProject.subscribe(page => {
      if (page !== '') {
        this.loadingInvestmentProjects = true;
        this.page = Number(page);
        this.getAllInvestmentProjects();
      }
    })
  }

  ngOnInit() {
   this.getAllInvestmentProjects();
   this.projectsForm = this.fb.group({
     username: ['']
   })
  }

  getAllInvestmentProjects(title?) {
    this.getAllInvestmentProjectsService.getAllInvestmentProjects(this.page, this.limit,title).subscribe(res => {
      this.loadingInvestmentProjects = false;
      this.data = res.projects;
      this.pageCount = res.pageCount;
    });
  }

  searchInvestmentProject() {
    this.loadingInvestmentProjects = true;
    this.getAllInvestmentProjects(this.projectsForm.value.username);
  }

}
