import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-capital-flow',
  templateUrl: './capital-flow.component.html',
  styleUrls: ['./capital-flow.component.css']
})
export class CapitalFlowComponent implements OnInit {
  startDate: any;
  endDate: any;
  list: any;
  constructor(public data: DataService, public http: HttpService) {
    this.startDate = this.data.getTime('yyyy-MM-dd', new Date(this.data.beforeMonth()));
    this.endDate = this.data.getTime('yyyy-MM-dd', new Date());
  }

  ngOnInit() {
    this.getlist();
  }

  change() {
    if (new Date(this.startDate).getTime() <= new Date(this.endDate).getTime()) {
      this.getlist();
    } else {
      this.data.ErrorMsg('开始日期必须大于结束日期');
    }

  }


  back() {
    window.history.back();
  }

  getlist() {
    const data = {
      accountCode: this.data.getOpUserCode(),
      createTimeStart: this.startDate,
      createTimeEnd: this.endDate
    };
    this.http.getFlow(data).subscribe(res => {
      this.list = res['rows'];
    }, err => {
      this.data.error = err.error;
      this.data.isError();
    });
  }

  color(status) {
    if (status === 1) {
      return 'status green';
    } else if (status === -1) {
      return 'status';
    } else {
      return 'status blue';
    }
  }
}
