import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ZixuanComponent } from '../zixuan/zixuan.component';
import { DataService } from '../data.service';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-quotalist',
  templateUrl: './quotalist.component.html',
  styleUrls: ['./quotalist.component.css']
})
export class QuotalistComponent extends ZixuanComponent {
  date: any;
  type: any;
  constructor(public data: DataService, public http: HttpService, public activeRoute: ActivatedRoute) {
    super(data, http);
    this.date = this.activeRoute.snapshot.params['id'].split('_')[0];
    this.type = this.activeRoute.snapshot.params['id'].split('_')[1];
  }
  back() {
    this.data.back();
  }

  quato(type) {
    this.type = type;
    this.data.clearInterval();
    this.getlist();
  }

  getlist() {
    this.http.getQuotaList(this.date, this.type).subscribe(res => {
      this.quoteDetail = res['quoteDetail'];
      this.q50eft = res['quote50ETF'];
      this.data.timeoutQoute = setTimeout(() => {
        this.getlist();
      }, 1000);
    }, err => {
      this.data.error = err.error;
      this.data.isError();
    });
  }
}
