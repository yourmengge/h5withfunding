import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';
import { HttpService } from '../../http.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  detail = {
    floatCashScale: 0,
    curCashScale: 0,
    cashScale: 0,
    commission: 0,
    cordonLine: 0,
    financePeriod: 'day',
    financeRatio: 0,
    financeStartDate: '',
    flatLine: 0,
    manageFeeRate: 0,
    opUserCode: '',
    positionRatio: 0,
    secondBoardPositionRatio: 0,
    cashType: 0 // =10 为浮动保证金风控用户，使用第二种版本页面，其他使用第一种版本页面
  };
  type = {
    day: '日配',
    month: '月配',
    week: '周配'
  };
  logo = '';
  version = 1;
  constructor(public data: DataService, public http: HttpService) {
    this.logo = this.data.logo;
  }

  ngOnInit() {
    this.http.userCenter().subscribe(res => {
      Object.assign(this.detail, res);
      this.version = this.detail.cashType === 10 ? 2 : 1;
    }, (err) => {
      this.data.error = err.error;
      this.data.isError();
    });
  }

  back() {
    this.data.back();
  }

}
