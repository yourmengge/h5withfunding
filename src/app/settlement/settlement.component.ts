import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-settlement',
  templateUrl: './settlement.component.html',
  styleUrls: ['./settlement.component.css']
})
export class SettlementComponent implements OnInit {
  startDate: any;
  endDate: any;
  list: any;
  constructor(public data: DataService, public http: HttpService) {
    if (!this.data.isNull(this.data.getSession('startDate'))) {
      this.startDate = this.data.getSession('startDate');
      this.endDate = this.data.getSession('endDate');
    } else {
      this.startDate = this.data.getTime('yyyy-MM-dd', this.data.beforeMonth());
      this.endDate = this.data.getTime('yyyy-MM-dd', new Date());
    }

  }

  ngOnInit() {
    this.getlist();
  }

  back() {
    this.data.setSession('startDate', '');
    this.data.setSession('endDate', '');
    this.data.back();
  }

  change() {
    if (new Date(this.startDate).getTime() <= new Date(this.endDate).getTime()) {
      this.getlist();
      this.data.setSession('startDate', this.startDate);
      this.data.setSession('endDate', this.endDate);
    } else {
      this.data.ErrorMsg('开始日期必须大于结束日期');
    }

  }

  getlist() {
    const data = {
      createTimeStart: this.startDate,
      createTimeEnd: this.endDate
    };
    this.http.settlement(data).subscribe(res => {
      this.list = res['resultInfo'];
    }, err => {
      this.data.error = err.error;
      this.data.isError();
    });
  }

  detail(data) {
    this.data.setSession('settleDetail', JSON.stringify(data));
    this.data.goto('settledetail');
  }

}
