import { Component, OnInit } from '@angular/core';
import { DischargeService } from './shared/discharge.service';
import { Input, IpNo, Consultant } from './shared/discharge.model';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-discharge-summary',
  templateUrl: './discharge-summary.component.html',
  styleUrls: ['./discharge-summary.component.scss'],
  providers: [DischargeService]
})

export class DischargeSummaryComponent implements OnInit {
  years: Array<string>;
  ipNos: Array<IpNo>;
  oldYears: Array<string>;
  oldIPNos: Array<IpNo>;
  cons: Array<Consultant>;
  treatments: string[];
  investigations: string[];
  inputs: Input;
  editMode: boolean;
  isSaving: boolean;
  isUpdating: boolean;
  isDeleting: boolean;

  constructor(private service: DischargeService, private toastr: ToastrService, private common: CommonService) { }

  ngOnInit(): void {
    this.common.mainData.next({ header: 'IP Discharge', treeView: 'liIPProcess', subTreeView: '', menu: 'liDischarge' });
    this.editMode = this.isSaving = this.isUpdating = this.isDeleting = false;
    this.years = []; this.ipNos = []; this.oldYears = []; this.oldIPNos = []; this.cons = []; this.treatments = []; this.investigations = [];
    this.inputs = this.service.getInputs();
    // $('#tabs').tabs();
    this.service.getStart()
      .toPromise()
      .then(d => {
        this.years.push(...d.years);
        this.oldYears.push(...d.years);
        this.ipNos.push(...d.ipNos);
        this.cons.push(...d.cons);
        if (d.years.length > 0)
          this.inputs.year = d.years[0];
      });
  }

  getIPNos(): void {
    this.inputs.ipNo = '';
    if (this.inputs.year !== '') {
      this.service.getIPNos(this.inputs.year)
        .toPromise()
        .then(d => {
          this.ipNos.splice(0, this.ipNos.length, ...d);
        });
    } else
      this.ipNos.length = 0;
  }

  getPatientDetails() {
    if (this.inputs.year !== '' && this.inputs.ipNo !== '') {
      this.service.getPatientDetails(this.inputs.ipNo)
        .toPromise()
        .then(d => {
          this.treatments = [];
          this.investigations = [];
          for (let obj in d.data)
            this.inputs[obj] = d.data[obj];

          d.treatments.forEach((elem) => {
            if (elem.department === 'Lab')
              this.investigations.push(elem.feesType);
            else
              this.treatments.push(elem.feesType);
          });
        });
    }
  }

  addInvestigation(inv: string): void {
    if (!this.inputs.investigation.includes(inv)) {
      this.inputs.investigation += this.inputs.investigation === '' ? inv : ', ' + inv;
    }
  }

  addTreatment(treat: string): void {
    if (!this.inputs.treatment.includes(treat)) {
      this.inputs.treatment += this.inputs.treatment === '' ? treat : ', ' + treat;
    }
  }

  saveDischarge(): void {
    if (this.inputs.year === '')
      this.toastr.info('Select the Year to Save!!!');
    else if (this.inputs.ipNo === '')
      this.toastr.info('Select the IP No to Save!!!');
    else {
      this.isSaving = true;
      const id = this.inputs.ipNo;
      this.service.saveDischarge(this.inputs)
        .toPromise()
        .then(d => {
          this.common.triggerSwal(d, 'Print Discharge Summary', 'Success')
            .then(swal => {
              if (swal.isConfirmed) {
                this.common.printPage(`ip-discharge/${id}`);
              }
            });
          this.clearPage();
          this.toastr.success(d);
        })
        .finally(() => this.isSaving = false);
    }
  }

  view(): void {
    this.editMode = true;
    this.treatments.length = this.investigations.length = this.ipNos.length = 0;
    if (this.oldYears.length > 0) {
      this.inputs.oldYear = this.oldYears[0];
      this.getDischargeIPNos();
    }
  }

  getDischargeIPNos(): void {
    if (this.inputs.oldYear !== '') {
      this.service.getDischargeIPNos(this.inputs.oldYear)
        .toPromise()
        .then(d => {
          this.oldIPNos.splice(0, this.oldIPNos.length, ...d);
          this.inputs.oldIPNo = '';
        });
    }
    else
      this.oldIPNos.length = 0;
  }

  getDischargeDetails(): void {
    if (this.inputs.oldYear !== '' && this.inputs.oldIPNo !== '') {
      this.service.getDischargeDetails(this.inputs.oldIPNo)
        .toPromise()
        .then(d => {
          for (let obj in d.data)
            this.inputs[obj] = d.data[obj];
        });
    }
  }

  modifyDischarge(): void {
    if (this.inputs.oldYear === '')
      this.toastr.error('Select the Year!!!');
    else if (this.inputs.oldIPNo === '')
      this.toastr.error('Select the IP No!!!');
    else {
      this.isUpdating = true;
      this.service.modifyDischarge(this.inputs)
        .toPromise()
        .then(d => this.toastr.success(d))
        .finally(() => this.isUpdating = false);
    }
  }

  deleteDischarge(): void {
    if (this.inputs.oldYear === '')
      this.toastr.error('Select the Year!!!');
    else if (this.inputs.oldIPNo === '')
      this.toastr.error('Select the IP No!!!');
    else {
      this.common.triggerSwal('Delete the Discharge Details?')
        .then(swal => {
          if (swal.isConfirmed) {
            this.isDeleting = true;
            this.service.deleteDischarge(this.inputs.oldIPNo)
              .toPromise()
              .then(d => {
                this.toastr.success(d);
                this.clearPage();
              })
              .finally(() => this.isDeleting = false);
          }
        });

    }
  }

  printDischarge(): void {
    if (this.inputs.oldYear === '')
      this.toastr.error('Select the Year!!!');
    else if (this.inputs.oldIPNo === '')
      this.toastr.error('Select the IP No!!!');
    this.common.printPage(`ip-discharge/${this.inputs.oldIPNo}`);
  }

  clearPage(): void {
    this.editMode = this.isSaving = this.isUpdating = this.isDeleting = false;
    for (let obj in this.inputs)
      this.inputs[obj] = (typeof this.inputs[obj]) === 'number' ? 0 : '';
    this.oldIPNos.length = 0;
    this.treatments.length = 0;
    this.investigations.length = 0;

    if (this.years.length > 0) {
      this.inputs.year = this.years[0];
      this.getIPNos();
    }
    else
      this.ipNos = [];
  }
}
