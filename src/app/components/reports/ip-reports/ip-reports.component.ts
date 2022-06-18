import { Component, OnInit, OnDestroy } from '@angular/core';
import { formatDate } from '@angular/common';
import { environment } from 'src/environments/environment';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CommonService } from 'src/app/services/common.service';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-ip-reports',
  templateUrl: './ip-reports.component.html',
  styleUrls: ['./ip-reports.component.scss']
})
export class IpReportsComponent implements OnInit, OnDestroy {
  formGroup: FormGroup;
  currentDate: Date;
  hasData: boolean;
  pdfUrl: string;
  pdfData: SafeResourceUrl;
  subscription: Subscription;

  constructor(private common: CommonService, private http: HttpClient, private domSanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.common.mainData.next({ header: 'IP Reports', treeView: 'liReport', subTreeView: '', menu: 'liIPReport' });
    this.hasData = false;
    const date = new Date;
    this.currentDate = date;
    this.formGroup = new FormGroup({
      type: new FormControl('admission'),
      startDate: new FormControl(date),
      endDate: new FormControl(date)
    });
  }

  private format(date: Date): string {
    return formatDate(date, 'y-MM-dd', 'en-IN', 'IST');
  }

  getData(): void {
    this.hasData = false;
    const type = this.formGroup.get('type').value;
    const startDate = this.format(this.formGroup.get('startDate').value);
    const endDate = this.format(this.formGroup.get('endDate').value);
    this.pdfUrl = `${environment.normUrl}reports/ip-reports/${type}/${startDate}/${endDate}`;
    this.subscription = this.http.get(this.pdfUrl + '/yes', { responseType: 'text' })
      .subscribe({
        next: (response) => {
          this.pdfData = this.domSanitizer.bypassSecurityTrustResourceUrl(`data:application/pdf;base64,${response}`);
          this.hasData = true;
        }
      });
  }

  ngOnDestroy(): void {
    if (typeof this.subscription !== 'undefined')
      this.subscription.unsubscribe();
  }

}
