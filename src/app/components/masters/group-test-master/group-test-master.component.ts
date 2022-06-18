import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { GroupTestService } from './shared/group-test.service';
import { Input, Field, Test, ButtonsState } from './shared/group-test.model';
import { ToastrService } from 'ngx-toastr';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-group-test-master',
  templateUrl: './group-test-master.component.html',
  styleUrls: ['./group-test-master.component.scss'],
  providers: [GroupTestService]
})
export class GroupTestMasterComponent implements OnInit {
  inputs: Input;
  tests: Array<Test>;
  fields: Array<Field>;
  categories: Array<string>;
  addedFields: Array<Field>;
  btnState: ButtonsState;
  editMode: boolean;
  private fieldEditMode: boolean;
  private currentField: number;
  selectConfigs: object;

  constructor(
    private common: CommonService,
    private service: GroupTestService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.common.mainData.next({ header: 'Group Test Master', treeView: 'liMasters', subTreeView: '', menu: 'liGpTestMaster' });
    this.fields = []; this.categories = []; this.addedFields = []; this.tests = [];
    this.selectConfigs = {
      search: true,
      displayKey: 'test',
      limitTo: 30,
      height: '400px',
      noResultsFound: 'No Tests Found',
      clearOnSelection: true
    };
    this.editMode = this.fieldEditMode = false;
    this.currentField = 0;
    this.inputs = {
      category: '',
      search: null,
      test: '',
      fees: 0,
      fieldCat: '',
      field: ''
    }
    this.btnState = { isSaving: false, isUpdating: false, isDeleting: false };
    this.service.startAutoComplete();
    this.service.getStart()
      .toPromise()
      .then(d => {
        this.categories = d.categories;
        this.fields = d.fields;
        this.service.fields = d.fields.map(m => m.field);
      });
  }

  addField(event: KeyboardEvent, value: string): void {
    if (event.key === 'Enter' && this.service.fields.includes(value)) {
      if (this.fieldEditMode) {
        const id = this.addedFields[this.currentField].id;
        const index = this.addedFields.findIndex(f => f.field === value && f.id !== id);
        if (index > -1)
          this.toastr.warning('Field already Added');
        else {
          this.addedFields[this.currentField].field = value;
          this.addedFields[this.currentField].category = this.inputs.fieldCat;
          this.inputs.field = '';
        }
        return;
      }

      //Adding New Field
      const index = this.addedFields.findIndex(f => f.field === value);
      if (index > -1)
        this.toastr.warning('Field already Added');
      else {
        const fieldIndex = this.fields.findIndex(f => f.field === value);
        const fieldId = this.fields[fieldIndex].id;
        this.addedFields.push({ id: fieldId, category: this.inputs.fieldCat, field: value });
        this.inputs.field = '';
      }
    }
  }

  reOrderFields(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.addedFields, event.previousIndex, event.currentIndex);
  }

  getFieldValue(index: number): void {
    this.fieldEditMode = true;
    this.currentField = index;
    this.inputs.fieldCat = this.addedFields[index].category;
    this.inputs.field = this.addedFields[index].field;
  }

  removeField(index: number): void {
    this.addedFields.splice(index, 1);
  }

  saveTest(): void {
    if (this.inputs.category === '')
      this.toastr.error('Select the Test Category');
    else if (this.inputs.test === '')
      this.toastr.error('Enter the Test Name');
    else if (this.inputs.fees === null)
      this.toastr.error('Enter the Test Fees');
    else if (this.addedFields.length === 0)
      this.toastr.error('No fields were Added to Save');
    else {
      this.btnState.isSaving = true;
      this.service.saveTest(this.inputs, this.addedFields)
        .toPromise()
        .then(d => {
          if (d.status) {
            this.toastr.success(d.message);
            this.clearPage();
          }
          else
            this.toastr.warning(d.message);
        })
        .finally(() => this.btnState.isSaving = false);
    }
  }

  view(): void {
    this.editMode = true;
    this.service.getTests()
      .toPromise()
      .then(d => this.tests = d);
  }

  getTestDetails(): void {
    if (this.inputs.search !== null) {
      this.service.getTestDetails(this.inputs.search)
        .toPromise()
        .then(d => {
          for (let obj in d.data)
            this.inputs[obj] = d.data[obj];
          this.addedFields = d.fields;
        });
    }
  }

  updateTest(): void {
    if (this.inputs.search === null)
      this.toastr.error('Select the Test to Update');
    else if (this.inputs.category === '')
      this.toastr.error('Select the Test Category');
    else if (this.inputs.test === '')
      this.toastr.error('Enter the Test Name');
    else if (this.inputs.fees === null)
      this.toastr.error('Enter the Test Fees');
    else if (this.addedFields.length === 0)
      this.toastr.error('No fields were Added');
    else {
      this.service.updateTest(this.inputs, this.addedFields)
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
    if (this.inputs.search === null)
      this.toastr.error('Select the Test to Delete');
    else {
      this.common.triggerSwal('Do you want to Delete ?')
        .then((result) => {
          if (result.isConfirmed) {
            this.service.deleteTest(this.inputs.search)
              .toPromise()
              .then(d => {
                this.clearPage();
                this.toastr.success(d);
              });
          }
        });
    }
  }

  clearPage(): void {
    this.editMode = this.fieldEditMode = false;
    this.currentField = 0;
    for (let obj in this.inputs)
      this.inputs[obj] = '';
    this.inputs.fees = 0;
    this.addedFields = [];
  }
}
