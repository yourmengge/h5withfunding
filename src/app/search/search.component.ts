import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { HttpService } from '../http.service';
import { Response, RequestOptions, Headers } from '@angular/http';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  date: string;
  drwt: DataService['drwt'];
  list: any;

  constructor(public data: DataService, public http: HttpService) {
    this.date = this.data.getTime('yyyy-MM-dd', new Date());
    // this.selectTime = new Date();
  }

  ngOnInit() {
    this.getOrder();
    this.data.intervalAppoint = setInterval(() => {
      this.getOrder();
    }, 3000);
  }

  getOrder() {
    this.http.getAppoint('date=' + this.data.getTime('yyyyMMss', this.date)).subscribe((res) => {
      this.list = res;
      // tslint:disable-next-line:forin
      // for (const i in this.list) {
      //   this.list[i].appointTime = this.toTime(this.list[i].appointTime);
      // }
    }, (err) => {
      this.data.error = err.error;
      this.data.isError();
    }, () => {
      this.data.Loading(this.data.hide);
    });
  }

  change() {
    if (!this.data.isNull(this.date)) {
      this.getOrder();
    }
  }

}

