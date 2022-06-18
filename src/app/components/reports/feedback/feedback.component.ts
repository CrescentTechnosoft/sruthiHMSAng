import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';
import { environment } from 'src/environments/environment';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {
  currentDate: string;
  reportDate: string;
  hasData: boolean = false;
  pdfData: SafeResourceUrl;

  constructor(private common: CommonService, private sanitizer: DomSanitizer, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.common.mainData.next({ header: 'Feedback Report', treeView: 'liReport',subTreeView:'', menu: 'liFeedBackRep' });
    this.currentDate = this.reportDate = formatDate((new Date), 'yyyy-MM-dd', 'en-IN', 'IST');
  }

  GetReport(): void {
    if (this.currentDate === '')
      this.toastr.error('Select the Valid Date!!!');
    else {
      this.pdfData = this.sanitizer.bypassSecurityTrustResourceUrl(`${environment.normUrl}Reports/Feedback/Get/${btoa(this.reportDate)}`);
      this.hasData = true;
    }
  }

}
