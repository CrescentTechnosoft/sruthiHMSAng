import { Component, OnDestroy, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CommonService } from 'src/app/services/common.service';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-monthly-collections',
  templateUrl: './monthly-collections.component.html',
  styleUrls: ['./monthly-collections.component.scss']
})
export class MonthlyCollectionsComponent implements OnInit, OnDestroy {
  year: number;
  month: number;

  years: Array<number>;
  months: Array<Month>;
  hasData: boolean = false;
  pdfUrl: string;
  pdfData: SafeResourceUrl;
  subscription: Subscription;

  constructor(private common: CommonService, private http: HttpClient, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.common.mainData.next({ header: 'Monthly Collections', treeView: 'liReport', subTreeView: 'liCollectionsRep', menu: 'liMonthlyColl' });
    this.year = 2021;
    this.month = 1;
    this.years = [];
    this.months = [];

    const date = new Date;
    const month = date.getMonth();
    for (let year = date.getFullYear(); year > 2021; year--)
      this.years.push(year);


    for (let i = 1; i < 12; i++) {
      date.setMonth(i);
      this.months.push({
        number: i + 1,
        name: date.toLocaleString('default', { month: 'short' })
      });
    }
    this.month = month + 1;
  }

  getData(): void {
    this.hasData = false;
    this.pdfUrl = `${environment.normUrl}reports/monthly-collections/${this.year}/${this.month}`;
    this.subscription = this.http.get(this.pdfUrl + '/yes', { responseType: 'text' })
      .subscribe({
        next: (response) => {
          this.pdfData = this.sanitizer.bypassSecurityTrustResourceUrl(`data:application/pdf;base64,${response}`);
          this.hasData = true;
        }
      });
  }

  ngOnDestroy(): void {
    if (typeof this.subscription !== 'undefined')
      this.subscription.unsubscribe();
  }
}

interface Month {
  number: number,
  name: string
}
