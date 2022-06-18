import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { LabService } from './shared/lab.service';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/app/services/common.service';
import { Field, Patient, BillNo, Inputs } from './shared/oplab.model';
import { MatDialog } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-oplab',
  templateUrl: './oplab.component.html',
  styleUrls: ['./oplab.component.scss'],
  providers: [LabService]
})
export class OPLabComponent implements OnInit {
  years: string[];
  billNos: BillNo[];
  testFields: Array<Field>;
  patientsList: Array<Patient>;
  headerState: boolean;
  selectedOnly: boolean;
  inputs: Inputs;

  @ViewChild('patientsDialog') patientsDialog: TemplateRef<ViewChild>;

  constructor(
    private service: LabService,
    private toastr: ToastrService,
    private common: CommonService,
    private dialog: MatDialog,
    private loaderService: NgxUiLoaderService
  ) { }

  ngOnInit(): void {
    this.common.mainData.next({ header: 'OP Lab', treeView: 'liLab', subTreeView: '', menu: 'liOPLab' });
    this.initProperties();
    this.service.getOpeningValues()
      .toPromise()
      .then(d => {
        this.years.push(...d.years);
        this.billNos.push(...d.bill_nos);
        if (this.years.length > 0)
          this.inputs.year = d.years[0];
      });
  }

  getBillNos() {
    if (this.inputs.year !== '') {
      this.service.getBillNos(this.inputs.year)
        .toPromise()
        .then(d => this.billNos = d);
    }
  }

  searchPatients(event: CustomKeyboardEvent) {
    if (event.key === 'Enter' && event.target.value !== '') {
      this.service.searchPatients(event.target.value)
        .toPromise()
        .then(d => {
          if (d.data.length > 0) {
            this.patientsList.splice(0, this.patientsList.length, ...d.data);
            this.dialog.open(this.patientsDialog);
          }
          else {
            this.toastr.info('No Patients found!!!');
          }
        });
    }
  }

  setSelectedPatient(index: number): void {
    const data = this.patientsList[index];
    const prevYear = this.inputs.year;

    this.inputs.year = data.year;

    if (prevYear !== this.inputs.year)
      this.getBillNos();

    this.inputs.billNo = data.id.toString();

    this.patientsList.length = 0;
    this.dialog.closeAll();
    this.getTestDetails();
  }

  getTestDetails() {
    if (this.inputs.year !== '' && this.inputs.billNo !== '') {
      this.service.getTestDetails(this.inputs.billNo)
        .toPromise()
        .then(d => {
          for (let obj in d.data)
            this.inputs[obj] = d.data[obj];

          // d.fields.forEach(elem => elem.checked = elem.checked === '1');
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

  saveResults(): void {
    if (this.inputs.year === '')
      this.toastr.error('Select the Year');
    else if (this.inputs.billNo === '')
      this.toastr.error('Select the Bill No');
    else {
      this.loaderService.start();
      this.service.saveResults(this.inputs.billNo, this.testFields)
        .toPromise()
        .then(d => {
          this.inputs.saved = true;
          this.toastr.success(d.message);
        })
        .finally(() => this.loaderService.stop());
    }
  }

  DeleteLabResult() {
    if (this.inputs.year === '')
      this.toastr.error('Select the Year');
    else if (this.inputs.billNo === '')
      this.toastr.error('Select the Bill No');
    else {
      this.common.triggerSwal('Do you want to Delete this Result??')
        .then(swal => {
          if (swal.isConfirmed) {
            this.loaderService.start();
            this.service.deleteResult(this.inputs.billNo)
              .toPromise()
              .then(d => {
                this.clearPage();
                this.toastr.success(d);
              })
              .finally(() => this.loaderService.stop());
          }
        });
    }
  }

  printResult(): void {
    if (this.inputs.year === '')
      this.toastr.error('Select the Year');
    else if (this.inputs.billNo === '')
      this.toastr.error('Select the Bill No');
    else {
      const type = this.headerState ? 'wh' : 'woh';
      const selected = this.testFields.filter(f => f.selected);
      const selectedTests = selected.map(m => m.id);

      if (this.selectedOnly && selected.length === 0) {
        this.toastr.info('No Tests were selected to Print!!!');
      }
      else {
        this.service.print(this.inputs.billNo, this.selectedOnly, type, selectedTests)
      }
    }
  }

  // SendSMS() {
  //   if (this.inputs.year === '')
  //     this.toastr.error('Select the Year');
  //   else if (this.inputs.billNo === '')
  //     this.toastr.error('Select the Bill No');
  //   else {
  //     this.service.SendSMS(this.inputs.year, this.inputs.billNo)
  //       .toPromise()
  //       .then(d => {
  //         if (d === 'Success')
  //           this.toastr.success('SMS Sent to Patient.');
  //         else if (d === 'Invalid')
  //           this.toastr.warning('Mobile no of Patient is Invalid\nCheck the Number in Billing!!!');
  //         else
  //           this.toastr.error('An Error Occured while sending the Message\nTry again Later!!!');
  //       });
  //   }
  // }

  clearPage(): void {
    this.testFields.length = 0;
    for (let obj in this.inputs)
      this.inputs[obj] = '';

    this.inputs.saved = false;
    if (this.years.length > 0) {
      this.inputs.year = this.years[0];
      this.service.getBillNos(this.years[0]);
    }
    else
      this.billNos.length = 0;
  }

  private initProperties() {
    this.inputs = this.service.getInputs();
    this.years = [];
    this.billNos = [];
    this.testFields = [];
    this.patientsList = [];
    this.headerState = false;
    this.selectedOnly = false;
  }
}
