import { Component, OnInit } from '@angular/core';
import {PaymentsService} from '../../../services/payments/payments.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ToursService} from '../../../services/tours/tours.service';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit {

  constructor(
    private paymentsService: PaymentsService,
    private fb: FormBuilder,
    private toursService: ToursService
    ) { }

  data;
  paymentsForm: FormGroup;
  pageCount;
  supportedPaymentTypes;
  loadingCurrencyCode = true;
  loadingPaymentTypes = true;
  loadingTableData = true;
  limit = 50;
  length;
  page = 0;
  supportedCurrencies;
  displayedColumns = ['orderId', 'payerId', 'paymentType', 'currencyCode', 'amountPaid'];
  ngOnInit(): void {
    this.getAllPayments({});
    this.paymentsForm = this.fb.group({
      payerId: [''],
      currencyCode: [''],
      paymentType: ['']
    });
    this.getSupportedCurrencies();
    this.getAllPaymentTypes();
  }

  getAllPayments(searchData) {
    this.paymentsService.getAllPayments({...searchData, page: this.page, limit: this.limit}).subscribe(res => {
      this.loadingTableData = false;
      this.data = res.payments;
      this.pageCount = res.pageCount;
      this.length = res.pageCount > 0 ? (this.limit * this.pageCount) : this.data.length;
    });
  }

  nextOrPreviousPage(event) {
    if (event.pageIndex < event.previousPageIndex) {
      this.page = this.page - 1;
      this.getAllPayments({});
    } else {
      this.page = this.page + 1;
      this.getAllPayments({});
    }
  }

  searchPayments() {
    this.getAllPayments(this.paymentsForm.value);
  }

  getSupportedCurrencies() {
    this.toursService.getAllSupportedCurrencies().subscribe(res => {
      this.loadingCurrencyCode = false;
      this.supportedCurrencies = res.supportedCurrencies;
    });
  }

  getAllPaymentTypes() {
    this.paymentsService.getAllPaymentTypes().subscribe(res => {
      this.loadingPaymentTypes = false;
      this.supportedPaymentTypes = res.items;
    });
  }

}
