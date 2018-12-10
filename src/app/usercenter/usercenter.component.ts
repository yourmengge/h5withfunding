import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../data.service';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-usercenter',
  templateUrl: './usercenter.component.html',
  styleUrls: ['./usercenter.component.css']
})
export class UsercenterComponent implements OnInit, OnDestroy {
  public menuList: any;
  public userInfo: DataService['userInfo'];
  public logo = 'hk';
  constructor(public data: DataService, public http: HttpService) {
    this.menuList = this.data.getCenterMenuList();
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

  usercenter() {
    this.http.userCenter().subscribe((res: DataService['userInfo']) => {
      this.userInfo = res;
      this.data.setSession('userName', res['accountName']);
      this.data.setSession('backscale', res['ableScale']);
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
    this.data.setLocalStorage('token', this.data.token);
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
    }

  }

}
