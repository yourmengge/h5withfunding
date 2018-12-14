import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-zixuan',
  templateUrl: './zixuan.component.html',
  styleUrls: ['./zixuan.component.css'],
  animations: [
    trigger('showDelete', [
      state('inactive', style({
        transform: 'translateX(0)',
      })),
      state('active', style({
        transform: 'translateX(45px)'
      })),
      transition('inactive => active', animate('300ms ease-in')),
      transition('active => inactive', animate('500ms ease-out'))
    ])
  ]
})
export class ZixuanComponent implements OnInit {
  hasZixuan = this.data.hide;
  show = 'inactive';
  zixuanList: any;
  zixuanArray = [];
  list: any;
  quote50ETF: any;
  quoteDetail: any;
  q50eft = {
    lastPrice: '',
    upDiff: '',
    upRatio: '',
    stockCode: ''
  };
  tablist: any;
  timeout: any;
  localStorge = `zixuan${this.data.getSession('opUserCode')}`;
  constructor(public data: DataService, public http: HttpService) { }

  ngOnInit() {
    this.data.clearInterval();
    // localStorage.clear();
    this.zixuanList = this.data.getLocalStorage(this.localStorge);
    if (!this.data.isNull(this.zixuanList)) {
      this.zixuanList = this.zixuanList.substr(this.zixuanList.indexOf(',') + 1, this.zixuanList.length);
    }
    console.log(this.zixuanList);
    this.generalTrend();
    if (!this.data.isNull(this.zixuanList)) {
      this.hasZixuan = this.data.show;
      this.subscribe();
    }

  }

  color(string) {
    if (string) {
      if (string.indexOf('-') >= 0) {
        return 'green';
      } else {
        return 'red';
      }
    }
  }

  generalTrend() {
    this.http.generalTrend().subscribe(res => {
      this.tablist = res;
      this.timeout = setTimeout(() => {
        this.generalTrend();
      }, 60000);
    }, err => {
      this.data.error = err.error;
      this.data.isError();
    });
  }

  edit() {
    this.show = this.show === 'active' ? 'inactive' : 'active';
  }

  goto2(code) {
    this.data.setSession('optionCode', code);
    this.data.goto('chart');
  }

  goto() {
    this.data.goto('main/ssgp');
  }

  subscribe() {
    this.http.zixuanSubscribe(this.zixuanList).subscribe((res) => {
      this.getDetail();
      this.data.intervalZX = setTimeout(() => {
        this.subscribe();
      }, 3000);
    }, (err) => {
      this.data.error = err.error;
      this.data.isError();
    }, () => {
      this.data.Loading(this.data.hide);
    });
  }

  getDetail() {
    this.http.zixuanDetail(this.zixuanList).subscribe((res) => {
      this.list = res;
    }, (err) => {
      this.data.error = err.error;
      this.data.isError();
    }, () => {
      this.data.Loading(this.data.hide);
    });
  }

  del(code) {
    this.zixuanArray = this.zixuanList.split(',');
    for (let i = 0; i < this.zixuanArray.length; i++) {
      if (this.zixuanArray[i] === code) {
        this.zixuanArray.splice(i, 1);
        this.data.ErrorMsg('该股票删除成功');
        this.zixuanList = this.zixuanArray.toString();
        if (this.zixuanList !== '') {
          this.subscribe();
        } else {
          this.data.clearInterval();
          this.hasZixuan = this.data.hide;
        }
        this.data.setLocalStorage(this.localStorge, this.zixuanArray);
      }
    }

  }

  fontColor(string) {
    if (string.indexOf('-') === -1) {
      return 'red';
    } else {
      return 'green';
    }
  }

}
