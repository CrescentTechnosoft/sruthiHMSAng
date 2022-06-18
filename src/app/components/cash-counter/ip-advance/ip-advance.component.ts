import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { CommonService } from '../../../services/common.service';
import { AdvanceService } from './shared/advance.service';
import { Input, Advance, IpNo } from './shared/advance.model';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-ipadvance',
  templateUrl: './ip-advance.component.html',
  styleUrls: ['./ip-advance.component.scss'],
  providers: [AdvanceService]
})
export class IPAdvanceComponent implements OnInit {
  years: Array<string>;
  ipNos: Array<IpNo>;
  inputs: Input;
  advances: Array<Advance>;
  editMode: boolean;
  isSaving: boolean;
  isUpdating: boolean;
  cardTypes: Array<string>;
  payTypes: Array<string>;
  paymentMethods: Array<string>;
  @ViewChild('cardTemplate') cardTemplate: TemplateRef<ViewChild>;


  constructor(
    private common: CommonService,
    private service: AdvanceService,
    private toatsr: ToastrService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.common.mainData.next({ header: 'IP Advance', treeView: 'liCashCounter', subTreeView: '', menu: 'liIPAdvance' });
    this.initProperties();
    this.service.getStart()
      .toPromise()
      .then(d => {
        this.years.push(...d.years);
        this.ipNos.push(...d.ipNos);
        this.cardTypes.push(...d.cardTypes);
        this.payTypes.push(...d.payTypes);
        if (this.years.length > 0)
          this.inputs.year = d.years[0];
      });
  }

  getIPNos(): void {
    this.inputs.ipNo = '';
    if (this.inputs.year !== '') {
      this.service.getIPNos(this.inputs.year)
        .toPromise()
        .then(d => this.ipNos = d);
    }
    else
      this.ipNos = [];
  }

  getPatientDetails(): void {
    if (this.inputs.year !== '' && this.inputs.ipNo !== '') {
      this.service.getPatientDetails(this.inputs.ipNo)
        .toPromise()
        .then(d => {
          this.advances.splice(0, this.advances.length, ...d.advances);
          for (let obj in d.data)
            this.inputs[obj] = d.data[obj];
        });
    }
    else {
      this.advances.length = 0;
    }
  }

  saveAdvance(): void {
    if (this.inputs.year === '')
      this.toatsr.error('Select the Year!!!');
    else if (this.inputs.ipNo === '')
      this.toatsr.error('Select the IP No');
    else if ((this.inputs.advance ?? 0) === 0)
      this.toatsr.error('Enter valid Advance Amount');
    else {
      this.isSaving = true;
      this.service.saveAdvance(this.inputs)
        .toPromise()
        .then(d => {
          if (d.status) {
            this.clearPage();
            this.common.triggerSwal(d.message, 'Print Bill', 'Success')
              .then(swal => {
                if (swal.isConfirmed) {
                  this.common.printPage(`advance/${d.id}`);
                }
              });
          } else
            this.toatsr.warning(d.message);
        })
        .finally(() => this.isSaving = false);
    }
  }

  editAdvance(index: number): void {
    this.editMode = true;
    const data = this.advances[index];

    this.inputs.advanceId = data.id;
    this.inputs.advance = data.amount;
    this.inputs.payType = data.payType;
    this.inputs.otherPayType = data.otherPayType;
    this.inputs.cardNo = data.cardNo;
    this.inputs.cardType = data.cardType;
    this.inputs.cardExpiry = data.cardExpiry;
  }

  updateAdvance(): void {
    if (this.inputs.year === '')
      this.toatsr.error('Select the Year!!!');
    else if (this.inputs.ipNo === '')
      this.toatsr.error('Select the IP No');
    else if ((this.inputs.advance ?? 0) === 0)
      this.toatsr.error('Enter valid Advance Amount');
    else {
      this.isUpdating = true;
      this.service.updateAdvance(this.inputs)
        .toPromise()
        .then(d => {
          if (d.status) {
            this.toatsr.success(d.message);
            this.clearPage();
          }
          else {
            this.toatsr.warning(d.message);
          }
        })
        .finally(() => this.isUpdating = false);
    }
  }

  deleteAdvance(advanceId: string): void {
    this.common.triggerSwal('Do you want to Delete the Advance?')
      .then(swal => {
        if (swal.isConfirmed) {
          this.service.deleteAdvance(advanceId)
            .toPromise()
            .then(d => {
              this.toatsr.success(d);
              this.clearPage();
            });
        }
      });
  }

  printAdvance(advanceId: string): void {
    this.common.printPage(`advance/${advanceId}`);
  }

  clearPage(): void {
    this.editMode = this.isSaving = this.isUpdating = false;
    this.advances.length = 0;
    for (let obj in this.inputs)
      this.inputs[obj] = '';

    this.inputs.payType = 'Cash';
    this.inputs.advance = 0;

    if (this.years.length > 0) {
      this.inputs.year = this.years[0];
      this.getIPNos();
    }
  }

  showCardDialog(type: string): void {
    if (type === 'Card')
      this.dialog.open(this.cardTemplate);
  }

  private initProperties() {
    this.editMode = this.isSaving = false;
    this.years = []; this.ipNos = []; this.advances = [];
    this.cardTypes = [];
    this.payTypes = [];
    this.paymentMethods = ['Cash', 'Card', 'Others'];
    this.inputs = {
      year: '',
      ipNo: '',
      ptId: '',
      name: '',
      age: '',
      gender: '',
      advance: 0,
      advanceId: null,
      payType: 'Cash',
      otherPayType: '',
      cardNo: '',
      cardType: '',
      cardExpiry: ''
    };
  }
}
