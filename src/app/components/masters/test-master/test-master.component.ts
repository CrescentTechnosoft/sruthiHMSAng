import { Component, OnInit, OnDestroy } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TestService } from './shared/test.service';
import { Input,Field,Test } from './shared/test.model';
import { CommonService } from '../../../services/common.service';

@Component({
  selector: 'app-test-master',
  templateUrl: './test-master.component.html',
  styleUrls: ['./test-master.component.scss'],
  providers: [TestService]
})
export class TestMasterComponent implements OnInit, OnDestroy {
  inputs: Input;
  fields: Array<Field>;
  tests: Array<Test>;
  catAddMode: boolean;
  editMode: boolean;
  isSaving: boolean;
  isUpdating: boolean;
  isDeleting: boolean;
  categories: Array<string>;

  constructor(private service: TestService, private toastr: ToastrService, private common: CommonService) { }

  ngOnInit(): void {
    this.common.mainData.next({ menu: 'liTestMaster', treeView: 'liMasters',subTreeView:'', header: 'Test Master' });
    this.inputs = { search: null, category: '', txtCategory: '', test: '', fees: 0, method: '', sample: '', units: '', normal: '', comment: '', parameters: '' };
    this.fields = []; this.tests = []; this.categories = []; 
    this.editMode = this.isSaving = this.isUpdating = this.isDeleting = this.catAddMode = false;

    this.service.getCategories()
      .toPromise()
      .then(d => {
        this.categories.push(...d);
      });
  }

  saveTest(): void {
    if (this.inputs.category === '')
      this.toastr.error('Select the Category');
    else if (this.inputs.test === '')
      this.toastr.error('Enter the Test Name');
    else if (this.inputs.fees === null)
      this.toastr.error('Enter Valid Test Cost');
    else {
      this.isSaving = true;
      this.service.saveTest(this.inputs)
        .toPromise()
        .then(d => {
          if (d.status) {
            this.clearPage();
            this.toastr.success(d.message);
          }
          else
            this.toastr.error(d.message);
        })
        .finally(() => this.isSaving = false);
    }
  }

  view() {
    this.editMode = true;
    this.service.getTests()
      .toPromise()
      .then(d => this.tests.push(...d));
  }

  getTestDetails() {
    if (this.inputs.search !== null) {
      this.service.getTestDetails(this.inputs.search)
        .toPromise()
        .then(d => {
          for (let obj in d.data)
            this.inputs[obj] = d.data[obj];
        });

    }
  }

  updateTest() {
    if (this.inputs.search===null)
      this.toastr.error('Select the Test to Update');
    else if (this.inputs.category === '')
      this.toastr.error('Select the Category');
    else if (this.inputs.fees === null)
      this.toastr.error('Enter Valid Test Cost');
    else {
      this.service.updateTest(this.inputs)
        .toPromise()
        .then(d => {
          if (d.status)
            this.toastr.success(d.message);
          else
            this.toastr.error(d.message);
        });
    }
  }

  deleteTest() {
    if (this.inputs.search===null)
      this.toastr.error('Select the Test Name');
    else {
      Swal.fire({
        title: 'Are you sure?',
        text: 'Do you want to Delete the Test?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No'
      }).then((result) => {
        if (result.isConfirmed) {
          this.isDeleting = true;
          this.service.deleteTest(this.inputs.search)
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

  clearPage(): void {
    this.isSaving = this.isDeleting = this.editMode = false;
    this.inputs.method = this.inputs.sample = this.inputs.units = this.inputs.normal = this.inputs.comment = this.inputs.parameters = '';
    this.inputs.search=null;
     this.inputs.category = this.inputs.test = '';
    this.inputs.fees = 0;
    this.tests.length = 0;
  }

  addCategory(): void {
    if (this.inputs.txtCategory !== '' && !this.categories.includes(this.inputs.txtCategory)) {
      this.service.addCategory(this.inputs.txtCategory)
        .toPromise()
        .then(d => {
          this.categories.push(this.inputs.txtCategory);
          this.inputs.category = this.inputs.txtCategory;
          this.inputs.txtCategory = '';
          this.catAddMode = false;
          this.toastr.success(d);
        });
    }
  }

  removeCategory(): void {
    if (this.inputs.category !== '') {
      Swal.fire({
        title: 'Are you sure?',
        text: 'Do you want to Delete the?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No'
      }).then((result) => {
        if (result.isConfirmed) {
          this.service.removeCategory(this.inputs.category)
            .toPromise()
            .then(d => {
              const catIndex = this.categories.findIndex(f => f === this.inputs.category);

              //Splice after autocomplete find to Search through categories
              this.categories.splice(catIndex, 1);
              this.inputs.category = '';
              this.toastr.success(d);
            });
        }
      });
    }
  }

  ngOnDestroy(): void {
    if ($('#txtCategory').hasClass('ui-autocomplete-input'))
      $('#txtCategory').autocomplete('destroy');
  }
}
