import { Component, OnInit, OnDestroy, ViewChild, TemplateRef } from '@angular/core';
import { BillingService } from './shared/billing.service';
import { Input, Treatment, IpNo, BillNo } from './shared/billing.model';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/app/services/common.service';
import { MatDialog } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-ip-billing',
  templateUrl: './ip-billing.component.html',
  styleUrls: ['./ip-billing.component.scss'],
  providers: [BillingService]
})

export class IPBillingComponent implements OnInit, OnDestroy {
  editMode: boolean;
  inputs: Input;
  years: Array<string>;
  ipNos: Array<IpNo>;
  billNos: Array<BillNo>;
  treatments: Array<Treatment>;
  payTypes: Array<string>;
  cardTypes: Array<string>;
  paymentModes: Array<string>;
  billType = 'hospital';
  @ViewChild('cardTemplate') cardTemplate: TemplateRef<ViewChild>;

  constructor(
    private service: BillingService,
    private toastr: ToastrService,
    private common: CommonService,
    private dialog: MatDialog,
    private loaderService: NgxUiLoaderService
  ) { }

  ngOnInit(): void {
    this.common.mainData.next({ header: 'IP Billing', treeView: 'liCashCounter', subTreeView: '', menu: 'liIPBill' });
    this.service.LoadFunctions();
    this.initProperties();
    this.service.getAll()
      .toPromise()
      .then(d => {
        this.years.push(...d.years);
        if (d.years.length > 0)
          this.inputs.year = d.years[0];
        this.ipNos.push(...d.ipNos);
        this.paymentModes.push(...d.payTypes);
        this.cardTypes.push(...d.cardTypes);
      });
  }

  getIPNos() {
    if (this.inputs.year !== '') {
      this.service.getIPNos(this.inputs.year)
        .toPromise()
        .then(d => this.ipNos.splice(0, this.ipNos.length, ...d));
    }
    else
      this.ipNos.splice(0, this.ipNos.length)
  }

  getTreatmentDetails(): void {
    if (this.inputs.year !== '' && this.inputs.ipNo !== '') {
      this.service.getTreatmentDetails(this.inputs.ipNo)
        .toPromise()
        .then(d => {
          for (let obj in d.data)
            this.inputs[obj] = d.data[obj];
          this.treatments.splice(0, this.treatments.length, ...d.treatments);
          this.calculateTotal();
        });
    }
  }

  saveBill(): void {
    if (this.inputs.year === '')
      this.toastr.error('Select the Year to Save');
    else if (this.inputs.ipNo === '')
      this.toastr.error('Select the IP No to Save');
    else if (this.getPayType() === '')
      this.toastr.error('Enter the Pay Type to Save');
    else if (this.inputs.subTotal < 0)
      this.toastr.error('Advance / Discount is Greater than Total Amount!!!');
    else {
      this.loaderService.start();
      this.service.saveBill(this.inputs, this.treatments)
        .toPromise()
        .then(d => {
          this.ClearPage();
          this.common.triggerSwal(d.message, 'Print Bill', 'Success', 'success', '#2fb926')
            .then(swal => {
              if (swal.isConfirmed) {
                this.common.printPage(`ip-bill/${d.billId}`)
              }
            });
        })
        .finally(() => this.loaderService.stop());
    }
  }

  view(): void {
    this.editMode = true;
    this.inputs.billNo = '';
    if (this.years.length > 0) {
      this.inputs.billYear = this.years[0];
      this.getBillNos();
    }
  }

  getBillNos(): void {
    if (this.inputs.billYear !== '') {
      this.service.getBillNos(this.inputs.billYear)
        .toPromise()
        .then(d => this.billNos.splice(0, this.billNos.length, ...d));
    } else {
      this.billNos.splice(0, this.billNos.length);
    }
  }

  getBillDetails(): void {
    if (this.inputs.billYear !== '' && this.inputs.billNo !== '') {
      this.service.getBillDetails(this.inputs.billNo)
        .toPromise()
        .then(d => {
          for (let obj in d.data)
            this.inputs[obj] = d.data[obj];
          this.treatments = d.treatments;
        });
    }
  }

  updateBill(): void {
    if (this.inputs.billYear === '')
      this.toastr.error('Select the Bill Year');
    else if (this.inputs.billNo === '')
      this.toastr.error('Select the Bill No');
    else if (this.getPayType() === '')
      this.toastr.error('Enter the Pay Type to Save');
    else if (this.inputs.subTotal < 0)
      this.toastr.error('Advance / Discount is Greater than Total Amount!!!');
    else {
      this.loaderService.start();
      this.service.updateBill(this.inputs, this.treatments)
        .toPromise()
        .then(d => this.toastr.success(d))
        .finally(() => this.loaderService.stop());
    }
  }

  deleteBill(): void {
    if (this.inputs.billYear === '')
      this.toastr.error('Select the Bill Year');
    else if (this.inputs.billNo === '')
      this.toastr.error('Select the Bill No');
    else {
      this.common.triggerSwal('Do you want to Delete this Bill?')
        .then(swal => {
          if (swal.isConfirmed) {
            this.loaderService.start();
            this.service.deleteBill(this.inputs.billNo)
              .toPromise()
              .then(d => {
                this.toastr.success(d);
                this.ClearPage();
              })
              .finally(() => this.loaderService.stop());
          }
        });
    }
  }

  PrintBill(): void {
    if (this.inputs.billYear === '')
      this.toastr.error('Select the Bill Year');
    else if (this.inputs.billNo === '')
      this.toastr.error('Select the Bill No');
    else
      this.common.printPage(`ip-bill/${this.inputs.billNo}/${this.billType}`);
  }

  ClearPage(): void {
    this.editMode = false;
    this.service.selectedDate = '';
    for (let obj in this.inputs)
      this.inputs[obj] = (typeof this.inputs[obj]) === 'number' ? 0 : '';
    this.treatments = [];
    this.inputs.payType = 'Cash';
    if (this.years.length > 0) {
      this.inputs.year = this.years[0];
      this.getIPNos();
    }
  }

  showCardDialog(type: string): void {
    if (type === 'Card') {
      this.dialog.open(this.cardTemplate);
    }
  }

  getPayType(): string {
    return this.inputs.payType !== 'Others' ? this.inputs.payType : this.inputs.otherType;
  }

  calculateTotal(): void {
    let total = 0, discount = 0;
    this.treatments.forEach((elem) => {
      total += elem.total;
      discount += elem.discount;
    });
    this.inputs.total = total;
    this.inputs.discount = discount;
    this.inputs.subTotal = this.inputs.paying = total - (discount + this.inputs.advance);
    this.inputs.due = 0;
    this.inputs.refund = 0;
  }

  ChangePayingAmt(): void {
    this.inputs.due = (this.inputs.subTotal ?? 0) - (this.inputs.paying ?? 0);
    if (this.inputs.due === 0)
      this.inputs.refund = 0;
    else if (this.inputs.due > 0)
      this.inputs.refund = 0;
    else {
      this.inputs.refund = Math.abs(this.inputs.due);
      this.inputs.due = 0;
    }
  }

  private initProperties(): void {
    this.years = []; this.ipNos = []; this.billNos = []; this.treatments = [];
    this.inputs = {
      year: '',
      ipNo: '',
      billYear: '',
      billNo: '',
      tIP: 0,
      ptId: 0,
      name: '',
      age: '',
      gender: '',
      consultant: '',
      total: 0,
      advance: 0,
      discount: 0,
      subTotal: 0,
      paying: 0,
      due: 0,
      refund: 0,
      payType: 'Cash',
      otherType: '',
      cardNo: '',
      cardType: '',
      cardExpiry: ''
    };
    this.editMode = false;
    this.payTypes = ['Cash', 'Card', 'Others'];
    this.paymentModes = [];
    this.cardTypes = [];
  }
  ngOnDestroy(): void {
    if ($('#txtCardType').hasClass('ui-autocomplete-input'))
      $('#txtCardType').autocomplete('destroy');
    if ($('#txtOthers').hasClass('ui-autocomplete-input'))
      $('#txtOthers').autocomplete('destroy');
    if ($('#cardDialog').parents('ui-dialog').length > 0)
      $('#cardDialog').dialog('destroy');
  }
}
