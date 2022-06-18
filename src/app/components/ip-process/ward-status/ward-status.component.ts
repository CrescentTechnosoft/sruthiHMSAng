import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ward-status',
  templateUrl: './ward-status.component.html',
  styleUrls: ['./ward-status.component.scss']
})
export class WardStatusComponent implements OnInit {
  rooms: WardData[];
  search: string;

  constructor(private common: CommonService,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.common.mainData.next({ header: 'Ward Status', treeView: 'liIPProcess', subTreeView: '', menu: 'liWardStatus' });
    this.rooms = this.route.snapshot.data['wardStatus'].data;
    this.search = '';
  }
}

interface WardData {
  year: string,
  ipNo: number,
  name: string,
  age: string,
  gender: string,
  admitted: string,
  contact: string,
  consultant: string,
  floor: string,
  ward: string,
  room: string,
  bedNo: string,
  rent: number,
  status:boolean
}
