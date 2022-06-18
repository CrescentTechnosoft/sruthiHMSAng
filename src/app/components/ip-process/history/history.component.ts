import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { HistoryService } from './shared/history.service';
import { Inputs, Treatment, IpNo, Patient } from './shared/history.model';
import { CommonService } from 'src/app/services/common.service';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
  providers: [HistoryService]
})
export class HistoryComponent implements OnInit {
  years: Array<string>;
  ipNos: Array<IpNo>;
  treatments: Array<Treatment>;
  inputs: Inputs;
  patients: Array<Patient>;

  @ViewChild('patientsTemplate') patientsTemplate: TemplateRef<ViewChild>;

  constructor(
    private service: HistoryService,
    private common: CommonService,
    private dialog: MatDialog,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.common.mainData.next({ header: 'IP History', treeView: 'liIPProcess', subTreeView: '', menu: 'liHistory' });
    this.years = [];
    this.ipNos = [];
    this.treatments = [];
    this.patients = [];
    this.inputs = { year: '', ipNo: '', id: '', name: '', age: '', gender: '', consultant: '', total: 0 };
    this.service.getYears()
      .toPromise()
      .then(d => {
        this.years = d.years;
        this.ipNos = d.ipNos;
        if (this.years.length > 0)
          this.inputs.year = d.years[0]
      });
  }

  searchPatient(value: string, event: KeyboardEvent) {
    if (event.key === 'Enter' && value !== '') {
      this.service.searchPatient(value)
        .toPromise()
        .then(response => {
          if (response.patients.length > 0) {
            this.patients.splice(0, this.patients.length, ...response.patients);
            this.dialog.open(this.patientsTemplate);
          }
          else {
            this.toastr.info('No Patients found!!!');
          }
        });
    }
  }

  setIPNo(data: Patient) {
    this.patients.length = 0;
    this.dialog.closeAll();
    const year = this.inputs.year;

    if (year !== data.year) {
      this.inputs.year = data.year;
      this.getIPNos(data.id);
    }
    else {
      this.inputs.ipNo = data.ipNo.toString();
      this.getIPHistory();
    }
  }

  getIPNos(id: number = null) {
    this.ipNos =[]; this.treatments = [];
    this.inputs.ipNo = '';
    if (this.inputs.year !== '') {
      this.service.getIPNos(this.inputs.year)
        .toPromise()
        .then(d => {
          this.ipNos.splice(0, this.ipNos.length, ...d);
          this.ipNos=d;
          if (id !== null) {
            this.inputs.ipNo = id.toString();
            this.getIPHistory();
          }
        });
    }
  }

  getIPHistory(): void {
    if (this.inputs.year !== '' && this.inputs.ipNo !== '') {
      this.service.getIPHistory(this.inputs.ipNo)
        .toPromise()
        .then(d => {
          this.treatments.splice(0, this.treatments.length, ...d.treatments);
          for (let obj in d.data)
            this.inputs[obj] = d.data[obj];
          this.calculateTotal();
        });
    }
    else {
      this.treatments.length = 0;
      this.inputs.total = 0;
    }
  }

  calculateTotal(): void {
    this.inputs.total = this.treatments.reduce((prev, curr) => prev + Number(curr.total), 0);
  }
}
