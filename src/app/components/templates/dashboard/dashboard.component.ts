import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { DataItem } from '@swimlane/ngx-charts';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
  showChart: boolean;
  barChartLabels: Array<string>;
  workData: Array<DataItem>;
  counts: ICounts;

  constructor(private common: CommonService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.initProperties();
    const data: ICounts = this.route.snapshot.data['dashboard'];
    this.counts = data;
    this.workData.push(
      { name: 'Registrations', value: data.Regs },
      { name: 'OP Bills', value: data.OPBills },
      { name: 'IP Admissions', value: data.IPAd },
      { name: 'IP Discharges', value: data.IPD },
      { name: 'IP Bills', value: data.IPBills }
    );
    this.showChart = true;
  }

  private initProperties() {
    this.counts = { Regs: 0, OPBills: 0, IPBills: 0, IPAd: 0, IPD: 0, IPWard: 0 };
    this.common.mainData.next({ header: 'Dashboard', treeView: '', subTreeView: '', menu: 'liDashboard' });
    this.workData = [];
    this.barChartLabels = [
      'Registrations',
      'OP Bills',
      'IP Admissions',
      'IP Admissions',
      'IP Discharges',
      'IP Bills'
    ];
  }
}

interface ICounts {
  Regs: number,
  OPBills: number,
  IPBills: number,
  IPAd: number,
  IPD: number,
  IPWard: number
}
