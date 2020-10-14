import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-settledetail',
  templateUrl: './settledetail.component.html',
  styleUrls: ['./settledetail.component.css']
})
export class SettledetailComponent implements OnInit {
  detail = {
    accountCode: '',
    commission: 0,
    dealAvrPrice: 0,
    dealCnt: 0,
    entrustFee: 0,
    manageFee: 0,
    occupAmount: 0,
    occupDays: 0,
    orderDate: '',
    otherFee: 0,
    pkOrder: '',
    profit: 0,
    serialNo: '',
    settleDate: '',
    stamp: 0,
    stockNo: '',
    subTypeDesc: '',
    transferFee: 0
  };
  constructor(public data: DataService, public http: HttpService) {
    Object.assign(this.detail, JSON.parse(this.data.getSession('settleDetail')));
  }

  ngOnInit() {
  }

  back() {
    this.data.back();
  }

}
