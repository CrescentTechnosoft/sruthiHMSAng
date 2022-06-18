import { Component, OnInit, OnDestroy } from '@angular/core';
import { TestService } from './shared/test.service';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/app/services/common.service';
import { Inputs, Field, Test } from './shared/test.model';

@Component({
  selector: 'app-test-master',
  templateUrl: './test-master.component.html',
  styleUrls: ['./test-master.component.scss'],
  providers: [TestService]
})
export class TestMasterComponent implements OnInit, OnDestroy {
  isFieldInEditMode: boolean;
  isSaving: boolean;
  isDeleting: boolean;
  selRow: number;
  testFields: Array<Field>;
  inputs: Inputs;
  tests: Array<Test>;
  selectConfigs: object;
  isInEditMode: boolean;

  constructor(private service: TestService, private toastr: ToastrService, private common: CommonService) { }

  ngOnInit(): void {
    this.common.mainData.next({ header: 'Test Master', treeView: 'liMasters', subTreeView: '', menu: 'liTestMaster' });
    this.isFieldInEditMode = this.isSaving = this.isDeleting = false;
    this.isInEditMode = false;
    this.selRow = -1;
    this.testFields = [];
    this.tests = [];

    this.inputs = this.service.GetInputs();
    this.service.loadFunctions();
    this.service.getCategories()
      .toPromise()
      .then(d => {
        this.service.categories = d;
      });
  }

  AddField(): void {
    if (this.inputs.field === '')
      this.toastr.error('Enter the Field to Add');
    else {
      this.testFields.push({ fieldCat: this.inputs.fieldCat, field: this.inputs.field, method: this.inputs.method, sample: this.inputs.sample, units: this.inputs.units, normal: this.inputs.normal, comments: this.inputs.comments });
      this.ClearFields();
    }
  }

  SetUpdateValues(index: number): void {
    this.isFieldInEditMode = true;
    this.selRow = index;
    const selRow = this.testFields[index];
    for (let obj in selRow)
      this.inputs[obj] = selRow[obj];
  }

  UpdateField(): void {
    if (this.inputs.field === '')
      this.toastr.error('Enter to Field to Update');
    else {
      const selRow = this.testFields[this.selRow];
      for (let obj in selRow)
        selRow[obj] = this.inputs[obj];

      this.ClearFields();
      this.selRow = -1;
      this.isFieldInEditMode = false;
    }
  }

  RemoveField(index: number) {
    this.testFields.splice(index, 1);
  }

  saveTest(): void {
    if (this.inputs.category === '')
      this.toastr.error('Enter the Test Category to Save');
    else if (this.inputs.test === '')
      this.toastr.error('Enter the Test Name to Save');
    else if (this.inputs.fees === null)
      this.toastr.error('Enter the Test Fees to Save');
    else if (this.testFields.length === 0)
      this.toastr.error('No Fields were Added to this Test');
    else {
      this.isSaving = true;
      this.service.saveTest(this.inputs, this.testFields)
        .toPromise()
        .then(d => {
          if (d.status) {
            this.clearPage();
            this.toastr.success(d.message);
            if (!this.service.categories.includes(this.inputs.category))
              this.service.categories.push(this.inputs.category);
          }
          else
            this.toastr.warning(d.message);
        })
        .finally(() => this.isSaving = false);
    }
  }

  view(): void {
    this.isInEditMode = true;
    this.service.getTests()
      .toPromise()
      .then(d => {
        this.tests.splice(0, this.tests.length, ...d);
      });
  }

  getTestDetails(): void {
    if (this.inputs.searchTest !== null) {
      this.service.getTestDetails(this.inputs.searchTest)
        .toPromise()
        .then(d => {
          this.inputs.category = d.data.category;
          this.inputs.test = d.data.test;
          this.inputs.fees = Number(d.data.fees);

          this.testFields = d.fields;
        })
        .catch((e: ErrorEvent) => console.log(e.message));
    }
  }

  updateTest(): void {
    if (this.inputs.searchTest === null)
      this.toastr.error('Select the Test Name to Update');
    else if (this.inputs.category === '')
      this.toastr.error('Enter the Test Category to Save');
    else if (this.inputs.test === '')
      this.toastr.error('Enter the Test Name to Save');
    else if (this.inputs.fees === null)
      this.toastr.error('Enter the Test Fees to Save');
    else if (this.testFields.length === 0)
      this.toastr.error('No Fields were Added to this Test');
    else {
      this.service.updateTest(this.inputs.searchTest, this.inputs, this.testFields)
        .toPromise()
        .then(d => {
          if (d.status)
            this.toastr.success(d.message);
          else
            this.toastr.warning(d.message);
        });
    }
  }

  deleteTest(): void {
    if (this.inputs.searchTest === null)
      this.toastr.error('Select the Test Name to Update');
    else {
      this.common.triggerSwal('Do you want to Delete this Test?')
        .then(swal => {
          if (swal.isConfirmed) {
            this.service.deleteTest(this.inputs.searchTest)
              .toPromise()
              .then(d => {
                this.toastr.success(d);
                this.clearPage();
              });
          }
        });
    }
  }

  ClearFields(): void {
    this.inputs.fieldCat = this.inputs.field = this.inputs.method = this.inputs.sample = this.inputs.units = this.inputs.normal = this.inputs.comments = '';
  }

  clearPage(): void {
    for (let obj in this.inputs) {
      this.inputs[obj] = '';
    }
    this.inputs.fees = 0;
    this.testFields.splice(0, this.testFields.length);
    this.tests.splice(0, this.tests.length);
    this.isFieldInEditMode = this.isSaving = this.isDeleting = false;
    this.isInEditMode = false;
    this.selRow = -1;
  }

  ngOnDestroy() {
    $('#txtSearchTestName,#txtTestCat').autocomplete('destroy');
  }
}
