import { Component, OnInit } from '@angular/core';
import { UserService } from './shared/user.service';
import { Access,Users } from './shared/user-access.model';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-user-access',
  templateUrl: './user-access.component.html',
  styleUrls: ['./user-access.component.scss'],
  providers:[UserService]
})
export class UserAccessComponent implements OnInit {
  users: Users[];
  Access: Array<Access>;
  userName: string;
  isSaving:boolean;

  constructor(private service: UserService,private toastr:ToastrService,private common:CommonService) { }

  ngOnInit(): void {
    this.common.mainData.next({header:'User Access',treeView:'liMasters',subTreeView:'', menu:'liUserAccess'});
    this.users = [];this.Access = [];
    this.userName = '';
    this.service.GetAccess()
      .toPromise()
      .then(d => {
        this.users = d.users;
        if (d.users.length > 0) {
          this.userName = d.users[0].id.toString();
          d.access.forEach(elem => elem.allowed = d.userAccess.includes(elem.access));
        }
        this.Access = d.access;
      });
  }

  ToggleAccess(value: boolean): void {
    this.Access.forEach((elem) => elem.allowed = value);
  }

  GetUserAccess(): void {
    this.service.GetUserAccess(this.userName)
      .toPromise()
      .then(d => {
        this.Access.forEach(elem => elem.allowed = d.includes(elem.access));
      });
  }

  Save(): void {
    if (this.userName !== '') {
      this.isSaving=true;
      this.service.SaveAccess(this.userName, this.Access.filter(val => val.allowed === true).map(d => d.access))
        .toPromise()
        .then(d => this.toastr.success(d))
        .finally(()=>this.isSaving=false);
    }
  }

  ClearPage(): void {
    if (this.users.length > 0) {
      this.userName = this.users[0].id.toString();
      this.GetUserAccess();
    }
    else
      this.Access.forEach(elem => elem.allowed = false);
  }
}
