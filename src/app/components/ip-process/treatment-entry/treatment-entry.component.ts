import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { TreatmentService } from './shared/treatment.service';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/app/services/common.service';
import { Treatment, Input, BillNo, RefNo } from './shared/treatment.model';

@Component({
  selector: 'app-treatment-entry',
  templateUrl: './treatment-entry.component.html',
  styleUrls: ['./treatment-entry.component.scss'],
  providers: [TreatmentService]
})
export class TreatmentEntryComponent implements OnInit, OnDestroy {
  editMode: boolean;
  isSaving: boolean;
  isUpdating: boolean;
  isDeleting: boolean;
  years: Array<string>;
  ipNos: Array<BillNo>;
  oldYears: Array<string>;
  oldIPNos: Array<BillNo>;
  refNos: Array<RefNo>;
  inputs: Input;
  treatments: Array<Treatment>;
  autocompleteValues: Array<string>;
  temp = { dept: '', category: '', feesId: 0, testType: '', feesName: '' };

  @ViewChild('qty') qty: ElementRef
  @ViewChild('cost') cost: ElementRef

  constructor(private service: TreatmentService, private toastr: ToastrService, private common: CommonService) { }

  ngOnInit(): void {
    this.common.mainData.next({ header: 'IP Treatment', treeView: 'liIPProcess', subTreeView: '', menu: 'liTreatment' });
    this.years = []; this.ipNos = []; this.oldYears = []; this.oldIPNos = []; this.refNos = []; this.treatments = []; this.autocompleteValues = [];
    this.inputs = this.service.GetInputs();
    this.editMode = this.isSaving = this.isUpdating = this.isDeleting = false;
    setTimeout(() => {
      $('#txtIPType').autocomplete({
        source: (req: any, res: any) => res(this.autocompleteValues.filter(f => f.toLowerCase().startsWith(req.term.toLowerCase())))
      });
    }, 0);
    this.service.getOpeningValues()
      .toPromise()
      .then(d => {
        this.years.push(...d.years);
        this.oldYears.push(...d.years);
        if (d.years.length > 0)
          this.inputs.year = d.years[0];
        this.ipNos.push(...d.ipNos);
        this.service.fees.push(...d.fees);
        this.service.tests.push(...d.tests);
        this.service.groupTests.push(...d.groupTests);
        this.service.profiles.push(...d.profiles);
        // this.service.medicines = d.medicines;
        this.autocompleteValues.push(...(d.fees.map(m => m.name).concat(d.tests.map(m => m.name), d.groupTests.map(m => m.name), d.profiles.map(m => m.name))));
      });
  }

  getIPNos(): void {
    this.ipNos.length = 0;
    if (this.inputs.year !== '') {
      this.service.getIPNos(this.inputs.year)
        .toPromise()
        .then(d => this.ipNos.push(...d));
    }
  }

  getPatientDetails(): void {
    if (this.inputs.year !== '' && this.inputs.ipNo !== '') {
      this.service.getPatientDetails(this.inputs.ipNo)
        .toPromise()
        .then(d => {
          for (let obj in d.data)
            this.inputs[obj] = d.data[obj];
        });
    }
  }

  getFees(evt: KeyboardEvent, value: string) {
    if ((evt.code === 'Enter' || evt.code === 'NumpadEnter') && value !== '') {
      const index = this.service.fees.findIndex(d => d.name === value);
      const testIndex = index > -1 ? 0 : this.service.tests.findIndex(d => d.name === value);
      const groupTestIndex = (index > -1 || testIndex > -1) ? 0 : this.service.groupTests.findIndex(f => f.name === value);
      const profileIndex = (index > -1 || testIndex > -1 || groupTestIndex > -1) ? 0 : this.service.profiles.findIndex(f => f.name === value);
      let dept = '';
      let testType = '';

      if (index > -1)
        dept = this.service.fees[index].department;
      else if (testIndex > -1) {
        dept = 'Lab';
        testType = 'Test';
      }
      else if (groupTestIndex > -1) {
        dept = 'Lab';
        testType = 'GroupTest';
      }
      else if (profileIndex > -1) {
        dept = 'Lab';
        testType = 'Profile';
      }

      const isAdded = this.treatments.findIndex(f => f.feesType === value) > -1;
      if (dept !== '') {
        this.temp.dept = dept;
        if (isAdded) {
          this.toastr.warning(value + ' is already added');
        }
        else {
          let method = '';
          let id = 0;
          switch (testType) {
            case '':
              method = 'fees-cost';
              id = this.service.fees[index].id;
              break;

            case 'Test':
              method = 'test-cost';
              id = this.service.tests[testIndex].id;
              break;

            case 'GroupTest':
              method = 'group-test-cost';
              id = this.service.groupTests[groupTestIndex].id;
              break;

            case 'Profile':
              method = 'profile-cost';
              id = this.service.profiles[profileIndex].id;
              break;

            default: break;
          }
          this.service.getFees(method, id)
            .toPromise()
            .then(d => {
              this.temp.category = d.category;
              this.temp.feesId = id;
              this.temp.testType = testType;
              this.temp.feesName = value;
              this.inputs.cost = d.cost;
              this.inputs.qty = 1;
              this.qty.nativeElement.focus();
            });
        }
      }
      else
        this.temp.dept = '';
    }
  }

  focusCost(evt: KeyboardEvent, value: string): void {
    if ((evt.code === 'Enter' || evt.code === 'NumpadEnter') && value !== '') {
      if (this.temp.dept !== '' && this.inputs.qty > 0) {
        // if (this.temp.dept === 'Medicine')
        //   this.addFees({ code: 'Enter' }, value);
        // else
        this.cost.nativeElement.focus();
      }
    }
  }

  addFees(evt: any, value: string): void {
    if ((evt.code === 'Enter' || evt.code === 'NumpadEnter') && value !== '') {
      if (this.temp.dept !== '' && this.inputs.qty > 0) {
        this.treatments.push({
          dept: this.temp.dept,
          feesId: this.temp.feesId,
          category: this.temp.category,
          feesType: this.temp.feesName,
          testType: this.temp.testType,
          qty: this.inputs.qty,
          cost: this.inputs.cost
        });
        this.temp.dept = this.temp.category = this.inputs.feesType = '';
        this.inputs.qty = this.inputs.cost = 0;
        document.getElementById('txtIPType').focus();
        this.calculateTotal();
      }
    }
  }

  removeFees(index: number) {
    this.treatments.splice(index, 1);
    this.calculateTotal();
  }

  saveTreatment(): void {
    if (this.inputs.year === '')
      this.toastr.error('Select the Year!!!');
    else if (this.inputs.ipNo === '')
      this.toastr.error('Select the IP No');
    else if (this.treatments.length < 1)
      this.toastr.error('No Treatments were Added');
    else {
      this.isSaving = true;
      this.service.saveTreatment(this.inputs.ipNo, this.inputs.id, this.treatments)
        .toPromise()
        .then(d => {
          this.clearPage();
          this.toastr.success(d);
        })
        .finally(() => this.isSaving = false);
    }
  }

  view(): void {
    this.editMode = true;
    this.ipNos = [];
    this.refNos = [];
    if (this.oldYears.length > 0) {
      this.inputs.oldYear = this.oldYears[0];
      this.service.getOldIPNos(this.inputs.oldYear)
        .toPromise().
        then(d => {
          this.oldIPNos = d;
          this.inputs.oldIPNo = '';
          this.inputs.refNo = '';
        });
    }
  }

  getOldIPNos(): void {
    this.oldIPNos = this.refNos = [];
    if (this.inputs.oldYear !== '') {
      this.service.getOldIPNos(this.inputs.oldYear)
        .toPromise()
        .then(d => this.oldIPNos.splice(0, this.oldIPNos.length, ...d));
    }
  }

  getRefNos(): void {
    if (this.inputs.oldYear !== '' && this.inputs.oldIPNo !== '') {
      this.service.getRefNos(this.inputs.oldIPNo)
        .toPromise()
        .then(d => this.refNos.splice(0, this.refNos.length, ...d));
    }
  }

  getTreatmentDetails(): void {
    if (this.inputs.oldYear !== '' && this.inputs.oldIPNo !== '' && this.inputs.refNo !== '') {
      this.service.getTreatmentDetails(this.inputs.refNo)
        .toPromise()
        .then(d => {
          for (let obj in d.data)
            this.inputs[obj] = d.data[obj];
          this.treatments = d.treatments;
          this.calculateTotal();
        });
    }
  }

  updateTreatment(): void {
    if (this.inputs.oldYear === '')
      this.toastr.error('Select the Year!!!');
    else if (this.inputs.oldIPNo === '')
      this.toastr.error('Select the IP No');
    else if (this.inputs.refNo === '')
      this.toastr.error('Select the Ref No');
    else if (this.treatments.length < 1)
      this.toastr.error('No Treatments were Added');
    else {
      this.isUpdating = true;
      this.service.updateTreatment(this.inputs.refNo, this.inputs.id,this.inputs.oldIPNo, this.treatments)
        .toPromise()
        .then(d => this.toastr.success(d))
        .finally(() => this.isUpdating = false);
    }
  }

  deleteTreatment(): void {
    if (this.inputs.oldYear === '')
      this.toastr.error('Select the Year!!!');
    else if (this.inputs.oldIPNo === '')
      this.toastr.error('Select the IP No');
    else if (this.inputs.refNo === '')
      this.toastr.error('Select the Ref No');
    else {
      Swal.fire({
        title: 'Confirmation',
        text: 'Do you want to Delete this Treatment Details?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'yes, delete it',
        cancelButtonText: 'Close',
        allowOutsideClick: false
      }).then((result) => {
        if (result.isConfirmed) {
          this.isDeleting = true;
          this.service.deleteTreatment(this.inputs.refNo)
            .toPromise()
            .then(d => {
              this.clearPage();
              this.toastr.success(d);
            })
            .finally(() => this.isDeleting = false);
        }
      });
    }
  }

  calculateTotal(): void {
    this.inputs.total = this.treatments.reduce((prev, curr) => prev + (curr.qty * curr.cost), 0);
  }

  clearPage(): void {
    this.editMode = this.isSaving = this.isUpdating = this.isDeleting = false;
    this.treatments = [];
    for (let obj in this.inputs)
      this.inputs[obj] = (typeof this.inputs[obj]) === 'number' ? 0 : '';

    if (this.years.length > 0) {
      this.inputs.year = this.years[0];
      this.getIPNos();
    }
  }

  ngOnDestroy() {
    $('#txtIPType').autocomplete('destroy');
  }
}
