import { Component, OnInit, OnDestroy, AfterViewChecked, AfterViewInit } from '@angular/core';
// import Swiper from 'swiper';
import { DataService } from '../data.service';
import { HttpService } from '../http.service';
declare var Swiper: any;
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit, OnDestroy, AfterViewInit {
  list: any;
  timeout: any;
  newslist: any;
  type = 0;
  title = [{
    id: 0,
    text: '天天赢'
  }, {
    id: 1,
    text: '周周发'
  }, {
    id: 2,
    text: '月月赚'
  }];
  detail = [{
    amount: '1000',
    multiple: '8',
    date: '天',
    money: '3',
    money2: '元',
    text: '2个交易日'
  }, {
    amount: '1000',
    multiple: '8',
    date: '周',
    money: '14.4',
    money2: '元',
    text: '5个交易日'
  }, {
    amount: '1000',
    multiple: '8',
    date: '月',
    money: '60',
    money2: '元',
    text: '一个月'
  }];
  maxMul: 0;
  minMul: 0;
  logo = '';
  staticData = [];
  financeData = [];
  financeDetail = [];
  oneType = false;
  showWithDraw = false;
  constructor(public data: DataService, public http: HttpService) {
    this.logo = this.data.logo;
    this.title = this.data.version === 2 ? [{
      id: 0,
      text: '天天赢'
    }] : this.title;
  }

  ngAfterViewInit() {
    const mySwiper = new Swiper('.swiper-container', {
      pagination: {
        el: '.swiper-pagination',
      },
      autoplay: {
        delay: 3000,
        stopOnLastSlide: false,
        disableOnInteraction: false,
      },
    });
  }

  ngOnInit() {
    this.generalTrend();
    this.newsList();
    this.getConfig();
    this.financeScheme();
  }

  getConfig() {
    this.http.getConfig().subscribe(res => {
      if (res['resultInfo']['CTRL_USE_H5_DEPOSIT_WITHDRAW'] === '1') {
        this.showWithDraw = true;
      } else {
        this.showWithDraw = false;
      }
    });
  }

  newsList() {
    this.http.newsList().subscribe(res => {
      this.newslist = res;
    }, err => {
      this.data.error = err.error;
      this.data.isError();
    });
  }

  ngOnDestroy() {
    window.clearTimeout(this.timeout);
  }

  generalTrend() {
    this.http.generalTrend().subscribe(res => {
      this.list = res;
      this.timeout = setTimeout(() => {
        this.generalTrend();
      }, 60000);
    }, err => {
      this.data.error = err.error;
      this.data.isError();
    });
  }

  getManageFee() {
    this.http.getManagerFee().subscribe(res => {
      this.detail.forEach((element, index) => {
        element.money = (res['resultInfo'][index]['financeRate'] * 1000 * this.minMul).toFixed(2);
      });
    });
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

  financeScheme() {
    this.http.financeScheme().subscribe(res => {
      const data = {
        id: 0,
        mul: 1
      };
      this.staticData = res['resultInfo'];
      this.financeData = res['resultInfo']['day'];
      this.finance();
      //  this.getManageFee();
    });
  }

  finance() {
    this.financeDetail = [];
    this.financeData.sort((a, b) => {
      return a['financeRatio'] - b['financeRatio'];
    });
    this.maxMul = this.financeData[this.financeData.length - 1]['financeRatio'];
    this.minMul = this.financeData[0]['financeRatio'];
  }

  goto(id) {
    this.data.setSession('zixuanId', id);
    this.data.goto('deposit');
  }

  goto2(id) {
    this.data.gotoId('newdetail', id);
  }

  selectType(id) {
    this.type = id;
    if (id === 0) {
      this.financeData = this.staticData['day'];
    } else if (id === 1) {
      this.financeData = this.staticData['week'];
    } else {
      this.financeData = this.staticData['month'];
    }
    this.finance();
  }

}
