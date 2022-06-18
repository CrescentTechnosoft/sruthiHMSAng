import { Component, OnInit } from '@angular/core';
import { FeesService, Inputs, Datas } from './fees.service';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-fees-master',
  templateUrl: './fees-master.component.html',
  providers: [FeesService]
})
export class FeesMasterComponent implements OnInit {
  departments: string[];
  feesList: Datas[];
  inputs: Inputs;
  deptAddMode: boolean;
  editMode: boolean;
  isSaving: boolean;
  isUpdating: boolean;
  selectedRow: number;
  selectedFilter: string;

  constructor(private service: FeesService, private toastr: ToastrService, private common: CommonService) { }

  ngOnInit(): void {
    this.common.mainData.next({ header: 'Fees Master', treeView: 'liMasters', subTreeView: '', menu: 'liFeesMaster' });
    this.departments = []; this.feesList = [];
    this.inputs = this.service.GetInputs();
    this.deptAddMode = this.editMode = this.isSaving = this.isUpdating = false;
    this.selectedFilter = 'All';
    this.selectedRow = -1;
    this.service.GetFeesList()
      .toPromise().then(d => {
        this.departments = d.departments;
        this.feesList = d.fees;
        if (d.departments.length > 0) {
          this.inputs.department = d.departments[0];
        }
      })
  }

  SaveFees(): void {
    if (this.inputs.department === '')
      this.toastr.error('Select the Department to Add');
    else if (this.inputs.feesName === '')
      this.toastr.error('Enter the Fees Name to Add');
    else if (this.inputs.opFees < 0)
      this.toastr.error('Enter the Fees to Add');
    else {
      this.isSaving = true;
      this.service.SaveFees(this.inputs)
        .toPromise()
        .then(d => {
          this.feesList.unshift({ id: parseInt(d), department: this.inputs.department, category: this.inputs.category, feesName: this.inputs.feesName, opFees: this.inputs.opFees, ipFees: this.inputs.ipFees });
          this.ClearPage();
          this.toastr.success('Fees Added');
        })
        .finally(() => this.isSaving = false);
    }
  }

  GetUpdateValues(index: number) {
    this.editMode = true;
    this.selectedRow = index;
    const selRow = this.feesList[index];
    this.inputs.id = Number(selRow.id);
    this.inputs.department = selRow.department;
    this.inputs.category = selRow.category;
    this.inputs.feesName = selRow.feesName;
    this.inputs.opFees = Number(selRow.opFees);
    this.inputs.ipFees = Number(selRow.ipFees);
  }

  UpdateFees(): void {
    if (this.inputs.department === '')
      this.toastr.error('Select the Department to Update');
    else if (this.inputs.feesName === '')
      this.toastr.error('Enter the Fees Name to Update');
    else if (this.inputs.opFees < 0)
      this.toastr.error('Enter the Fees to Update');
    else {
      this.isUpdating = true;
      this.service.UpdateFees(this.inputs.id, this.inputs)
        .toPromise()
        .then(d => {
          this.toastr.success(d);
          const selRow = this.feesList[this.selectedRow];
          selRow.department = this.inputs.department;
          selRow.category = this.inputs.category;
          selRow.feesName = this.inputs.feesName;
          selRow.opFees = this.inputs.opFees;
          selRow.ipFees = this.inputs.ipFees;
          this.ClearPage();
        })
        .finally(() => this.isUpdating = false);
    }
  }

  DeleteFees(id: number, index: number): void {
    this.common.triggerSwal('Do you want to Delete this Fees?')
      .then(swal => {
        if (swal.isConfirmed) {
          this.service.DeleteFees(id)
            .toPromise()
            .then(d => {
              this.toastr.success(d);
              this.feesList.splice(index, 1);
            })
            .catch((e: ErrorEvent) => console.log(e.error));
        }
      });
  }

  ClearPage(): void {
    this.deptAddMode = this.editMode = this.isSaving = this.isUpdating = false;
    this.selectedRow = -1;

    const sel = this.inputs.filterDept;
    for (let obj in this.inputs) {
      this.inputs[obj] = typeof this.inputs[obj] === 'number' ? 0 : '';
    }
    if (this.departments.length > 0)
      this.inputs.department = this.departments[0];
    this.inputs.filterDept = sel;
  }

  FilterDatas(): void {
    this.selectedFilter = this.inputs.filterDept;
  }

  AddDepartment(evt: KeyboardEvent): void {
    if (evt.code === 'Enter' && this.inputs.txtDepartment !== '' && !this.departments.includes(this.inputs.txtDepartment)) {
      if (this.inputs.txtDepartment === 'Lab')
        this.toastr.error('Cannot Add Lab in Departments!!!')
      else {
        this.service.AddDepartment(this.inputs.txtDepartment)
          .toPromise()
          .then(d => {
            this.toastr.success(d);
            this.departments.push(this.inputs.txtDepartment);
            this.inputs.department = this.inputs.txtDepartment;
            this.inputs.txtDepartment = '';
            this.deptAddMode = false;
          });
      }
    }
  }

  RemoveDepartment(): void {
    if (this.departments.includes(this.inputs.department)) {
      this.common.triggerSwal('Deleting the Department will also Deletes all Fees within this Department\nDo you want to Continue?')
        .then(swal => {
          if (swal.isConfirmed) {
            this.service.RemoveDepartment(this.inputs.department)
              .toPromise()
              .then(d => {
                this.toastr.success(d);
                const index = this.departments.findIndex(f => f === this.inputs.department);
                this.departments.splice(index, 1);
              });
          }
        });
    }
  }
}
