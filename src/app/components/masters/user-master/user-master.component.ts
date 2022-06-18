import { Component, OnInit } from '@angular/core';
import { UserService } from './shared/user.service';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/app/services/common.service';
import { User, Inputs } from './shared/user-master.model';

@Component({
  selector: 'app-user-master',
  templateUrl: './user-master.component.html',
  styleUrls: ['./user-master.component.scss'],
  providers: [UserService]
})
export class UserMasterComponent implements OnInit {
  users: Array<User>;
  showPassword: boolean;
  isSaving: boolean;
  isUpdating: boolean;
  isDeleting: boolean;
  inputs: Inputs;

  constructor(private service: UserService, private toastr: ToastrService, private common: CommonService) { }

  ngOnInit(): void {
    this.common.mainData.next({ header: 'User Master', treeView: 'liMasters', subTreeView: '', menu: 'liUserMaster' });
    this.users = [];
    this.showPassword = this.isSaving = this.isUpdating = this.isDeleting = false;
    this.inputs = this.service.GetInputs();
    $('#tabs').tabs();
    this.service.GetUsers()
      .toPromise()
      .then((d) => {
        this.users = d;
      });
  }

  AddUser(): void {
    if (this.inputs.addUser === '')
      this.toastr.error('Enter the User Name to Save');
    else if (this.inputs.addLoginName === '')
      this.toastr.error('Enter the Login Name to Save');
    else if (this.inputs.addPass === '')
      this.toastr.error('Enter the Password to Save');
    else if (this.inputs.addCPass === '')
      this.toastr.error('Enter the Password Again to Verify');
    else if (this.inputs.addPass !== this.inputs.addCPass)
      this.toastr.error('Passwords not Matching');
    else {
      this.isSaving = true;
      this.service.AddUser({ user: this.inputs.addUser, login: this.inputs.addLoginName, pass: this.inputs.addPass })
        .toPromise()
        .then(d => {
          if (d.status) {
            this.toastr.success(d.message);
            this.users.push({ id: d.id, name: this.inputs.addUser });
            this.ClearPage();
          }
          else {
            this.toastr.warning(d.message);
          }
        })
        .finally(() => this.isSaving = false);
    }
  }

  getUserDetails(): void {
    if (this.inputs.updateUser !== '') {
      this.service.getUserDetails(this.inputs.updateUser)
        .toPromise()
        .then(d => {
          this.inputs.updateNewUser = d.user;
          this.inputs.updateLogin = d.login;
        });
    }
  }

  updateUser(): void {
    if (this.inputs.updateUser === '')
      this.toastr.error('Select the User Name to Update');
    else if (this.inputs.updateNewUser === '')
      this.toastr.error('Enter the User Name to Update');
    else if (this.inputs.updateLogin === '')
      this.toastr.error('Enter the Login Name to Update');
    else {
      this.isUpdating = true;
      this.service.updateUser(this.inputs.updateUser, {
        user: this.inputs.updateNewUser,
        login: this.inputs.updateLogin,
        pass: this.inputs.updatePass
      })
        .toPromise()
        .then(d => {
          if (d.status) {
            this.toastr.success(d.message);
          }
          else {
            this.toastr.warning(d.message);
          }
        })
        .finally(() => this.isUpdating = false);
    }
  }

  RemoveUser(): void {
    if (this.inputs.deleteUser === '')
      this.toastr.error('Select the User Name to Delete');
    else if (this.users.length === 1)
      this.toastr.error('Cannot delete the Last User!!!');
    else {
      this.common.triggerSwal('Do you want to Delete the User Details?')
        .then(swal => {
          if (swal.isConfirmed) {
            this.isDeleting = true;
            this.service.DeleteUser(this.inputs.deleteUser)
              .toPromise()
              .then(d => {
                const index = this.users.findIndex(d => d.id.toString() === this.inputs.deleteUser);
                this.users.splice(index, 1);
                this.inputs.deleteUser = '';
                this.toastr.success(d);
              })
              .finally(() => this.isDeleting = false);
          }
        });
    }
  }

  ClearPage(): void {
    this.inputs.addUser = this.inputs.addPass = this.inputs.addCPass = this.inputs.updatePass = '';
    this.inputs.addLoginName = ''; this.inputs.updateUser = ''; this.inputs.updateNewUser = ''; this.inputs.updateLogin = '';
    this.inputs.deleteUser = '';
    this.isSaving = this.isUpdating = this.isDeleting = false;
  }

}
