import { Component, OnInit, OnDestroy, ViewChild, TemplateRef } from '@angular/core';
import { LabService } from './shared/lab.service';
import { Input, Field, Patient, IpNo } from './shared/lab.model';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { CommonService } from 'src/app/services/common.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-iplab',
  templateUrl: './iplab.component.html',
  styleUrls: ['./iplab.component.scss'],
  providers: [LabService]
})
export class IPLabComponent implements OnInit, OnDestroy {
  years: string[];
  ipNos: Array<IpNo>;
  testFields: Array<Field>;
  patientsList: Array<Patient>;
  headerState: boolean;
  inputs: Input;
  selectedOnly: boolean;
  destroy$: Subject<void>;

  @ViewChild('patientsTemplate') patientsTemplate: TemplateRef<ViewChild>;

  constructor(
    private service: LabService,
    private toastr: ToastrService,
    private common: CommonService,
    private loaderService: NgxUiLoaderService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.common.mainData.next({ header: 'IP Lab', treeView: 'liLab', subTreeView: '', menu: 'liIPLab' });
    this.years = []; this.ipNos = []; this.testFields = []; this.patientsList = [];
    this.headerState = false;
    this.selectedOnly = false;
    this.inputs = {
      year: '',
      ipNo: '',
      ptId: '',
      name: '',
      age: '',
      gender: '',
      consultant: '',
      saved: false,
    };
    this.destroy$ = new Subject<void>();


    this.service.getOpeningValues()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: response => {
          this.years.push(...response.years);
          this.ipNos.push(...response.ipNos);
          if (response.years.length > 0)
            this.inputs.year = response.years[0];
        }
      });
  }


  searchPatients(event: CustomKeyboardEvent) {
    if (event.key === 'Enter' && event.target.value !== '') {
      this.service.searchPatients(event.target.value)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: response => {
            if (response.length > 0) {
              this.patientsList.splice(0, this.patientsList.length, ...response);
              this.dialog.open(this.patientsTemplate);
            }
            else {
              this.toastr.info('No Patient found!!!');
            }
          }
        });
    }
  }

  setSelectedPatient(index: number): void {
    const data = this.patientsList[index];
    const prevYear = this.inputs.year;

    if (prevYear === data.year) {
      this.inputs.ipNo = data.treatmentId.toString();
      this.getLabDatas();
    }
    else {
      this.inputs.year = data.year;
      this.getIPNos(data.treatmentId);
    }

    this.dialog.closeAll();
    this.patientsList.length = 0;
  }

  getIPNos(ipNo: number = null) {
    if (this.inputs.year !== '') {
      this.service.getIPNos(this.inputs.year)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: response => {
            this.ipNos.splice(0, this.ipNos.length, ...response);
            if (ipNo !== null) {
              this.inputs.ipNo = ipNo.toString();
              this.getLabDatas();
            }
          }
        });
    }
  }

  getLabDatas() {
    if (this.inputs.year !== '' && this.inputs.ipNo !== '') {
      this.service.getLabDatas(this.inputs.ipNo)
        .toPromise()
        .then(d => {
          for (let obj in d.data)
            this.inputs[obj] = d.data[obj];

          this.testFields.splice(0, this.testFields.length, ...d.fields);
        })
        .catch((e: ErrorEvent) => console.log(e.message));
    }
  }

  toggleFocus(evt: KeyboardEvent, index: number): void {
    if (evt.key === 'Enter') {
      const rowIndex = (this.testFields.length > index + 1) ? index + 1 : 0;

      document.querySelectorAll('#tblLabResult tbody tr')[rowIndex].getElementsByTagName('td')[3].getElementsByTagName('input')[0].focus();
    }
  }

  toggleState(index: number, value: string) {
    this.testFields[index].selected = (value !== '');
  }

  saveLabResults(): void {
    if (this.inputs.year === '')
      this.toastr.error('Select the Year');
    else if (this.inputs.ipNo === '')
      this.toastr.error('Select the IP No');
    else {
      this.loaderService.start();
      this.service.saveLabResults(this.inputs.ipNo, this.testFields)
        .toPromise()
        .then(d => {
          this.inputs.saved = true;
          this.toastr.success(d.message);
        })
        .finally(() => this.loaderService.stop());
    }
  }

  deleteLabResult() {
    if (this.inputs.year === '')
      this.toastr.error('Select the Year');
    else if (this.inputs.ipNo === '')
      this.toastr.error('Select the IP No');
    else {
      this.common.triggerSwal('Do you want to Delete this Result??')
        .then(swal => {
          if (swal.isConfirmed) {
            this.loaderService.start();
            this.service.deleteLabResult(this.inputs.ipNo)
              .toPromise()
              .then(d => {
                this.clearPage();
                this.toastr.success(d.message);
              })
              .finally(() => this.loaderService.stop());
          }
        });
    }
  }

  printResult(): void {
    if (this.inputs.year === '')
      this.toastr.error('Select the Year');
    else if (this.inputs.ipNo === '')
      this.toastr.error('Select the IP No');
    else {
      const type = this.headerState ? 'wh' : 'woh';
      const selected = this.testFields.filter(f => f.selected);
      const selectedTests = selected.map(m => m.id);

      this.service.print(this.inputs.ipNo, this.selectedOnly, type, selectedTests);
    }
  }

  clearPage(): void {
    this.testFields = [];
    for (let obj in this.inputs)
      this.inputs[obj] = (typeof this.inputs[obj]) === 'boolean' ? false : '';
    if (this.years.length > 0) {
      this.inputs.year = this.years[0];
      this.getIPNos();
    }
    else
      this.ipNos = [];
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
