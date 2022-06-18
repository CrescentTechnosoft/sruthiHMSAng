import { Component, OnInit, OnDestroy } from '@angular/core';
import { DocService } from './shared/doc.service';
import { Inputs } from './shared/doctor-master.model';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-doctor-master',
  templateUrl: './doctor-master.component.html',
  styleUrls: ['./doctor-master.component.scss'],
  providers: [DocService]
})
export class DoctorMasterComponent implements OnInit, OnDestroy {
  consList: Array<Inputs>;
  selectedRow: number;
  inputs: Inputs;
  isSaving: boolean;
  isUpdating: boolean;
  editMode: boolean;

  constructor(private service: DocService, private toastr: ToastrService, private common: CommonService) { }

  ngOnInit(): void {
    this.common.mainData.next({ header: 'Doctor Master', treeView: 'liMasters', subTreeView: '', menu: 'liDoctorMaster' });
    this.consList = [];
    this.selectedRow = -1;
    this.isSaving = this.isUpdating = this.editMode = false;
    this.inputs = { id: 0, name: '', age: '', gender: 'Male', contact: '', specs: '', qualification: '', status: 'Active', email: '', address: '' };
    this.service.LoadFunction();
    this.service.GetStart()
      .toPromise()
      .then(d => {
        this.consList = d.doctors;
        this.service.specializations = d.specs;
      });
  }

  GetUpdateValues(index: number) {
    this.editMode = true;
    this.selectedRow = index;
    const arr = this.consList[index];
    for (let obj in arr)
      this.inputs[obj] = arr[obj];
    this.inputs.id = Number(arr.id);
  }

  SaveData() {
    if (this.inputs.name === '')
      this.toastr.error('Enter the Name to Save');
    else if (this.inputs.specs === '')
      this.toastr.error('Enter the Specialization');
    else {
      this.isSaving = true;
      this.service.SaveData(this.inputs)
        .toPromise()
        .then(d => {
          if (d.status) {
            this.consList.unshift({ id: parseInt(d.id), name: this.inputs.name, age: this.inputs.age, gender: this.inputs.gender, specs: this.inputs.specs, qualification: this.inputs.qualification, contact: this.inputs.contact, email: this.inputs.email, status: this.inputs.status, address: this.inputs.address });
            this.ClearPage();
            this.toastr.success('Data Saved!!!');
          }
          else
            this.toastr.warning(d.message);
        })
        .finally(() => this.isSaving = false);
    }
  }

  UpdateData(): void {
    if (this.inputs.name === '')
      this.toastr.error('Enter the Name to Update');
    else if (this.inputs.specs === '')
      this.toastr.error('Enter the Specialization');
    else {
      this.isUpdating = true;
      this.service.UpdateData(this.inputs)
        .toPromise()
        .then(d => {
          if (d.status) {
            const selRow = this.consList[this.selectedRow];
            for (let obj in this.inputs)
              selRow[obj] = this.inputs[obj];

            this.ClearPage();
            this.toastr.success(d.message);
          }
          else
            this.toastr.warning(d.message);
        })
        .finally(() => this.isUpdating = false);
    }
  }

  DeleteData(id: number, index: number) {
    this.common.triggerSwal('Do you want to Delete the Doctor Details')
      .then(swal => {
        if (swal.isConfirmed) {
          this.service.DeleteData(id)
            .toPromise()
            .then(d => {
              this.toastr.success(d);
              this.consList.splice(index, 1);
            });
        }
      });
  }

  ClearPage(): void {
    for (let obj in this.inputs)
      this.inputs[obj] = '';

    this.selectedRow = -1;
    this.inputs.gender = 'Male';
    this.inputs.status = 'Active';
    this.editMode = false;
  }

  AddSpecialization() {
    if (this.inputs.specs !== '' && !this.service.specializations.includes(this.inputs.specs)) {
      this.service.AddSpecialization(this.inputs.specs)
        .toPromise()
        .then(d => {
          this.service.specializations.push(this.inputs.specs);
          this.toastr.success(d);
        },
          e => console.log(e)
        );
    }
  }

  RemoveSpecialization() {
    if (this.service.specializations.includes(this.inputs.specs)) {
      this.service.RemoveSpecialization(this.inputs.specs)
        .toPromise()
        .then(d => {
          const index = this.service.specializations.findIndex(f => f === this.inputs.specs);
          this.service.specializations.splice(index, 1);
          this.toastr.success(d);
        },
          e => console.log(e)
        );
    }
  }

  ngOnDestroy(): void {
    if ($('#txtSpecialization').hasClass('ui-autocomplete-input'))
      $('#txtSpecialization').autocomplete('destroy');
  }
}
