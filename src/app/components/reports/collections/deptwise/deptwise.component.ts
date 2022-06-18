import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { formatDate } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-deptwise',
  templateUrl: './deptwise.component.html',
  styleUrls: ['./deptwise.component.scss']
})
export class DeptwiseComponent implements OnInit {
  depts: Array<string> = [];
  hasData: boolean = false;
  pdfData: SafeResourceUrl = '';
  dept: string = 'All';
  startDate: string = '';
  endDate: string = '';

  constructor(private http: HttpClient, private sanitizer: DomSanitizer, private toastr: ToastrService, private common: CommonService) { }

  ngOnInit(): void {
    this.common.mainData.next({ header: 'Departmentwise Collections', treeView: 'liReport',subTreeView:'liCollectionsRep', menu: 'liDeptColl' });

    this.startDate = this.endDate = formatDate((new Date), 'yyyy-MM-dd', 'en-IN', 'Asia/kolkata');

    this.http.get<string[]>(environment.normUrl + 'Reports/Collections/Deptwise/GetDepts')
      .toPromise()
      .then(d => this.depts = d)
      .catch((e: ErrorEvent) => console.log(e.message));
  }

  GetData(): void {
    if (this.startDate === '')
      this.toastr.error('Select the Start Date')
    else if (this.endDate === '')
      this.toastr.error('Select the End Date');
    else {
      this.pdfData = this.sanitizer.bypassSecurityTrustResourceUrl(`${environment.normUrl}Reports/Collections/Deptwise/Get/${btoa(this.dept)}/${btoa(this.startDate)}/${btoa(this.endDate)}#zoom=100`);
      this.hasData = true;
    }
  }

}
