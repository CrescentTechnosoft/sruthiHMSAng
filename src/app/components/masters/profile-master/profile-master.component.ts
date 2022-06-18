import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProfileService } from './shared/profile.service';
import { Input, Test, AddedTest, BtnState, Profile } from './shared/profile.model';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from '../../../services/common.service';

@Component({
  selector: 'app-profile-master',
  templateUrl: './profile-master.component.html',
  styleUrls: ['./profile-master.component.scss'],
  providers: [ProfileService]
})
export class ProfileMasterComponent implements OnInit, OnDestroy {
  profiles: Array<Profile>;
  tests: Array<Test>;
  groupTests: Array<Test>;
  addedTests: Array<AddedTest>;
  editMode: boolean;
  inputs: Input;
  btnState: BtnState;

  constructor(private service: ProfileService, private toastr: ToastrService, private common: CommonService) { }

  ngOnInit(): void {
    this.common.mainData.next({ menu: 'liProfileMaster', treeView: 'liMasters', subTreeView: '', header: 'Profile Master' });
    this.inputs = { search: '', profile: '', fees: 0, test: '' };
    this.profiles = this.addedTests = []; this.tests = []; this.groupTests = [];
    this.btnState = { isSaving: false, isUpdating: false, isDeleting: false };
    this.editMode = false;
    this.service.loadFunction();
    this.service.getStart()
      .toPromise()
      .then(d => {
        this.tests = d.test;
        this.groupTests = d.groupTest;
        this.service.tests = d.test.map(m => m.test).concat(d.groupTest.map(m => m.test));
      });
  }

  addTest(event: KeyboardEvent, value: string): void {
    if (event.key === 'Enter' && this.service.tests.includes(value)) {
      const index = this.addedTests.findIndex(f => f.test === value);
      if (index === -1) {
        const testIndex = this.tests.findIndex(f => f.test === value);

        if (testIndex > -1)
          this.addedTests.push({ id: this.tests[testIndex].id, test: value, type: 'Test' });
        else {
          const groupTestIndex = this.groupTests.findIndex(f => f.test === value);
          this.addedTests.push({ id: this.groupTests[groupTestIndex].id, test: value, type: 'Group' });
        }
        this.inputs.test = '';
      }
    }
  }

  removeTest(index: number): void {
    this.addedTests.splice(index, 1);
  }

  saveProfile(): void {
    if (this.inputs.profile === '')
      this.toastr.error('Enter the Profile Name');
    else if (this.inputs.fees === null)
      this.toastr.error('Enter the Profile Fees');
    else if (this.addedTests.length === 0)
      this.toastr.error('No Tests were Added to Profile');
    else {
      this.btnState.isSaving = true;
      this.service.saveProfile(this.inputs, this.addedTests)
        .toPromise()
        .then(d => {
          if (d.status) {
            this.clearPage();
            this.toastr.success(d.message);
          }
          else {
            this.toastr.warning(d.message);
          }
        })
        .finally(() => this.btnState.isSaving = false);
    }
  }

  view(): void {
    this.editMode = true;
    this.service.getProfiles()
      .toPromise()
      .then(d => {
        this.profiles = d;
      });
  }

  getProfileDetails(): void {
    if (this.inputs.search !== '') {
      this.service.getProfileDetails(this.inputs.search)
        .toPromise()
        .then(d => {
          this.inputs.profile = d.data.profile;
          this.inputs.fees = d.data.fees;
          this.addedTests = d.tests;
        });
    }
  }

  updateProfile(): void {
    if (this.inputs.search === '')
      this.toastr.error('Select the Profile Name to Update');
    else if (this.inputs.profile === '')
      this.toastr.error('Enter the Profile Name');
    else if (this.inputs.fees === null)
      this.toastr.error('Enter the Profile Fees');
    else if (this.addedTests.length === 0)
      this.toastr.error('No Tests were Added to Profile');
    else {
      this.service.updateProfile(this.inputs, this.addedTests)
        .toPromise()
        .then(d => {
          if (d.status)
            this.toastr.success(d.message)
          else
            this.toastr.warning(d.message);
        });
    }
  }

  deleteProfile(): void {
    if (this.inputs.search === '')
      this.toastr.error('Select the Profile to Delete');
    else {
      const profile = this.profiles[this.profiles.findIndex(f => f.id.toString() === this.inputs.search)].profile;
      this.common.triggerSwal("Do you want to Delete " + profile + '?')
        .then((result) => {
          if (result.isConfirmed) {
            this.btnState.isDeleting = true;
            this.service.deleteProfile(this.inputs.search)
              .toPromise()
              .then(d => {
                this.clearPage();
                this.toastr.success(d);
              })
              .finally(() => this.btnState.isDeleting = false);
          }
        });
    }
  }

  clearPage(): void {
    this.btnState.isSaving = this.btnState.isDeleting = false;
    this.addedTests = [];
    this.inputs.search = this.inputs.profile = this.inputs.test = '';
    this.inputs.fees = 0;
    this.editMode = false;
  }

  ngOnDestroy(): void {
    if ($('#txtTestName').hasClass('ui-autocomplete-input'))
      $('#txtTestName').autocomplete('destroy');
  }
}
