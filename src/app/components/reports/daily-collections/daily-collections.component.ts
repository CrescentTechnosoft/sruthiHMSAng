import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';
import { environment } from 'src/environments/environment';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-daily-collections',
  templateUrl: './daily-collections.component.html',
  styleUrls: ['./daily-collections.component.scss']
})
export class DailyCollectionsComponent implements OnInit {
  currentDate: string;
  expenses:number;
  patients:number;
  reportDate:string;
  hasData: boolean = false;
  pdfData: SafeResourceUrl;

  constructor(private common: CommonService, private sanitizer: DomSanitizer, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.common.mainData.next({ header: 'Daily OP Collections', treeView: 'liReport',subTreeView:'', menu: 'liDailyColl' });
    this.currentDate=this.reportDate = formatDate((new Date), 'yyyy-MM-dd', 'en-IN', 'IST');
    this.expenses=this.patients=0;
  }

  GetReport(): void {
    if (this.currentDate === '')
      this.toastr.error('Select the Valid Date!!!');
    else {
      this.pdfData = this.sanitizer.bypassSecurityTrustResourceUrl(`${environment.normUrl}Reports/DailyCollections/Get/${btoa(this.reportDate)}/${btoa(this.expenses.toString())}/${btoa(this.patients.toString())}`);
      this.hasData = true;
    }
  }

}
