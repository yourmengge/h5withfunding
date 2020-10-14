import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../data.service';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-usercenter',
  templateUrl: './usercenter.component.html',
  styleUrls: ['./usercenter.component.css']
})
export class UsercenterComponent implements OnInit, OnDestroy {
  public menuList = [{
    id: 'withdraw',
    name: '提现',
    class: ''
  }, {
    id: 'recharge',
    name: '充值',
    class: 'sell'
  }, {
    id: 'deposit',
    name: '入金',
    class: 'deposit'
  }, {
    id: 'chujin',
    name: '出金',
    class: 'chedan'
  }, {
    id: 'capitalflow',
    name: '资金流水',
    class: 'chicang'
  }];
  public userInfo: DataService['userInfo'];
  public logo = 'hk';
  freezaFee = 0;
  ableScale = 0;
  constructor(public data: DataService, public http: HttpService) {
  }
  ngOnDestroy() {
    this.data.clearInterval();
  }
  ngOnInit() {
    this.logo = this.data.logo;
    this.data.clearInterval();
    this.userInfo = this.data.userInfo;
    this.usercenter();
  }

  goto(url) {
    this.data.goto('main/jiaoyi/' + url);
  }

  setting() {
    this.data.goto('setting');
  }

  usercenter() {
    this.http.userCenter().subscribe((res: DataService['userInfo']) => {
      this.userInfo = res;
      const backscale = res['balance'];
      this.data.setSession('userName', res['accountName']);
      this.data.setSession('ableTakeoutScale', res['ableTakeoutScale']);
      this.freezaFee = parseFloat(this.userInfo.lockScale) + parseFloat(this.userInfo.freezeScale);
      this.data.setSession('backscale', parseFloat(backscale) <= 0 ? 0 : backscale);
      this.data.intervalCapital = setTimeout(() => {
        this.usercenter();
      }, 60000);
    }, (err) => {
      this.data.error = err.error;
      this.data.isError();
    }, () => {
      this.data.Loading(this.data.hide);
    });
  }
  /**
  * 取消订阅
  */
  cancelSubscribe() {
    this.http.cancelSubscribe().subscribe((res) => {
      this.data.resetStockHQ();
      console.log('取消订阅');
    });
  }
  logout() {
    this.cancelSubscribe();
    this.data.ErrorMsg('注销成功');
    this.data.isConnect = false;
    this.data.token = this.data.randomString(32);
    localStorage.removeItem('h5tncltoken');
    this.data.removeSession('opUserCode');
    setTimeout(() => {
      this.data.goto('main/login');
    }, 1000);
  }

  goto2(url) {
    if (url === 'withdraw') {
      this.http.getCard().subscribe(res => {
        if (this.data.isNull(res)) {
          this.data.ErrorMsg('请先绑定银行卡');
          this.data.goto('card');
        } else {
          this.data.goto(url);
        }
      });
    } else {
      this.data.goto(url);
      this.data.setSession('cashScale', this.userInfo['cashScale']);
      this.data.setSession('allottedScale', this.userInfo.allottedScale);
    }

  }

}
