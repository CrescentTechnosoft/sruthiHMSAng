import { Component, OnInit, OnDestroy } from '@angular/core';
import { formatDate } from '@angular/common';
import { environment } from 'src/environments/environment';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CommonService } from 'src/app/services/common.service';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-overall-collection-report',
  templateUrl: './overall.component.html',
  styleUrls: ['./overall.component.scss']
})

export class OverAllReportComponent implements OnInit, OnDestroy {
  hasData: boolean = false;
  pdfUrl: string;
  pdfData: SafeResourceUrl;
  subscription$: Subscription;
  dateRange: FormGroup;
  currentDate: Date;

  constructor(private sanitizer: DomSanitizer, private common: CommonService, private http: HttpClient) { }

  ngOnInit(): void {
    this.common.mainData.next({ header: 'Overall Collections', treeView: 'liReport', subTreeView: 'liCollectionsRep', menu: 'liCollReport' });

    const date = new Date;
    this.currentDate = date;
    this.dateRange = new FormGroup({
      startDate: new FormControl(date),
      endDate: new FormControl(date)
    });
  }

  format(date: Date): string {
    return formatDate(date, 'yyyy-MM-dd', 'en-IN', 'IST');
  }

  getData(): void {
    this.hasData = false;
    const startDate = this.format(this.dateRange.get('startDate').value);
    const endDate = this.format(this.dateRange.get('endDate').value);
    this.pdfUrl = `${environment.normUrl}reports/overall-collections/${startDate}/${endDate}`;
    this.subscription$ = this.http.get(this.pdfUrl + '/yes', { responseType: 'text' })
      .subscribe({
        next: (response) => {
          this.pdfData = this.sanitizer.bypassSecurityTrustResourceUrl(`data:application/pdf;base64,${response}`);
          this.hasData = true;
        }
      });
  }

  ngOnDestroy(): void {
    if (typeof this.subscription$ !== 'undefined')
      this.subscription$.unsubscribe();
  }
}
