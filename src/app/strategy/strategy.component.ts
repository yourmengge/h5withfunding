import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { HttpService } from '../http.service';
declare var layer: any;
@Component({
  selector: 'app-strategy',
  templateUrl: './strategy.component.html',
  styleUrls: ['./strategy.component.css']
})
export class StrategyComponent implements OnInit {
  strategyType = '0'; // 0 天 ，1 周，2 月
  info = {
    bzj: 1000,
    cpje: 5000,
    fwf: '0',
    jjje: '4600',
    tradeDay: this.data.getTime('yyyy-MM-dd', new Date()),
    zsje: '4400'
  };
  leftMoney: any;
  agreement = false;
  manageFee: any = 0;
  peiziData: any;
  dateText = 'day';
  financeFee = 0;
  isAdd: any;
  version: any;
  financeData = [];
  dayType = ['day', 'week', 'month'];
  constructor(public data: DataService, public http: HttpService) {
    this.isAdd = this.data.getSession('isAdd');
  }

  ngOnInit() {
    this.peiziData = JSON.parse(this.data.getSession('strategyData'));
    console.log(this.peiziData);
    this.version = this.data.getSession('version');
    this.strategyType = this.peiziData.type;
    // 增配时，管理费从个人详情接口获取，还未配置策略时，管理费从管理费接口通过判断获取
    // this.getManageFeeType();
    this.newManageFee();
    this.getVersion();
    // this.http.getManagerFee().subscribe(res => {
    //   let resData = [];
    //   resData = resData.concat(res['resultInfo']);
    //   const fee = resData[this.strategyType]['financeRate'];
    //   this.info.fwf = (Math.round(fee * this.peiziData.mulType * this.peiziData.money * 100) / 100).toFixed(2);
    //   this.info.bzj = this.peiziData.money;
    //   this.info.cpje = this.peiziData.money * (this.peiziData.mulType + 1) + parseInt(this.data.getSession('allottedScale2'), 0);
    //   this.dateText = resData[this.strategyType]['financePeriod'];
    //   const manageFee = {
    //     financeRatio: this.peiziData.mulType,
    //     financePeriod: this.dateText,
    //     amount: this.peiziData.money
    //   };
    //   this.http.getManagerFee2(manageFee).subscribe(res2 => {
    //     this.manageFee = res2['resultInfo']['amount'];
    //   });
    //   this.info.jjje = this.info.cpje * this.peiziData.cordonLineRate;
    //   this.info.zsje = this.info.cpje * this.peiziData.flatLineRate;
    // });
    this.info.bzj = this.peiziData.money;
    // this.info.cpje = this.peiziData.money * (this.peiziData.mulType + 1) + parseInt(this.data.getSession('allottedScale2'), 0);
    this.dateText = this.dayType[this.strategyType];
    const manageFee = {
      financeRatio: this.peiziData.mulType,
      financePeriod: this.dateText,
      amount: this.peiziData.money
    };
    // this.http.getManagerFee2(manageFee).subscribe(res2 => {
    //   this.manageFee = res2['resultInfo']['amount'];
    // });
    this.info.jjje = (this.info.cpje * this.peiziData.cordonLineRate).toFixed(2);
    this.info.zsje = (this.info.cpje * this.peiziData.flatLineRate).toFixed(2);
  }
  back() {
    this.data.back();
  }

  /**
   * 获取管理费类型
   */
  getManageFeeType() {
    this.http.getManageFee().subscribe(res => {
      if (res['resultInfo']['type'] === '1') { // 等1调用新版接口，等0用原来的方法
        this.newManageFee();
      } else {
        this.getManageFee();
      }
    });
  }

  getVersion() {
    this.http.getManageFee().subscribe(res => {
      if (res['resultInfo']['CTRL_FREEZE_CASH'] === '1' || this.data.getSession('version') === '2') {
        this.info.cpje = this.peiziData.money * (this.peiziData.mulType) + parseInt(this.data.getSession('allottedScale2'), 0);
      } else {
        this.info.cpje = this.peiziData.money * (this.peiziData.mulType + 1) + parseInt(this.data.getSession('allottedScale2'), 0);
      }
    });
  }

  getManageFee() {
    if (this.isAdd === 'true') {
      this.http.userDetail().subscribe(res => {
        this.info.fwf = (Math.round(res['manageFeeRate'] * this.peiziData.mulType * this.peiziData.money * 100) / 100).toFixed(2);
      });
    } else {
      this.http.financeScheme().subscribe(res => {
        if (this.peiziData.type === '0') {
          this.financeData = res['resultInfo']['day'];
        } else if (this.peiziData.type === '1') {
          this.financeData = res['resultInfo']['week'];
        } else {
          this.financeData = res['resultInfo']['month'];
        }
        this.financeData.forEach(element => {
          if (element['financeRatio'] === this.peiziData.mulType) {
            this.financeFee = element['financeFeeRate'];
            this.info.fwf = (Math.round(this.financeFee * this.peiziData.mulType * this.peiziData.money * 100) / 100).toFixed(2);
          }
        });
      });
    }
  }

  newManageFee() {
    const data = {
      financeRatio: this.peiziData.mulType,
      financePeriod: this.dayType[this.peiziData.type],
      amount: this.peiziData.money

    };
    this.http.newManageFee(data).subscribe(res => {
      this.manageFee = res['resultInfo']['thisPeriodFee'].toFixed(2);
      this.info.fwf = res['resultInfo']['periodFee'].toFixed(2);
    }, (err) => {
      this.data.error = err.error;
      this.data.isError();
    });
  }

  alert(type) {
    let msg = '';
    if (type === 0) {
      msg = '当亏损金额低于预警金额时，只能止损不能建仓，需要尽快补充保证金，以免低于亏损止损金额被止损';
    } else {
      msg = '当前金额低于止损金额时,我们将有权把您的股票进行平仓,为避免平仓发生,请时刻关注风险保证金是否充足';
    }
    // 信息框
    layer.open({
      content: msg
      , btn: '我知道了'
    });
  }

  attention() {
    // 信息框
    layer.open({
      content: `<div style="text-align:left;height:10rem;overflow:auto;height:60vh">
      注意事项：<br><br>
      <br>1.不得购买S、ST、*ST、S*ST、SST、以及被交易所特别处理的股票；<br>
      <br>2.当操盘资金低于亏损警戒线时，需尽快补足风险保证金，且不能买入股票；<br>
      <br>3.当操盘资金低于平仓线下时，我们有权将您账户里的股票实行卖出处理；<br>
      <br>4.客户有停牌股票，可以继续支付账户管理费延续账户直至停牌结束，
      并在停牌股票持有的当天算起3天内追加停牌股票市值30%的保证金；<br>
      <br>5.客户有停牌股票，不再补缴保证金，且不支付账户管理费，
      默认为放弃该账户权益，账户盈亏和客户无关，不退还任何资金；<br>
      </div>
      `
      // <br>9.不得购买新上市30个自然日内的新股（或复牌首日股票）等当日不设涨跌停板限制的股票
      , btn: '我知道了',
    });
  }

  submit() {
    if (!this.agreement) {
      this.attention();
    } else {
      this.submitAlert();
    }
  }

  submitAlert() {
    const serviceFee = this.strategyType === '0' ? this.info.fwf : this.manageFee;
    const serviceText = serviceFee === '0.00' ? '' : `<p>服务费：${serviceFee}</p>`;
    layer.open({
      content: `<p>保证金：${this.info.bzj}</p>
      ${serviceText}
      <p>共需支付：${this.info.bzj}</p>`
      , btn: ['立即申请', '取消']
      , yes: (index) => {
        layer.close(index);
        this.getLiftAmount();
      }
    });
  }

  chicang() {
    layer.open({
      title: '单股持仓',
      content: `<table class="RiskPositionPercents">
      <thead></thead>
      <tbody><tr>
        <td>个股持仓比例</td>
        <td>创业板持仓比例</td>
      </tr><tr>
      <td>${this.peiziData.positionRatio}</td>
      <td>${this.peiziData.secondBoardPositionRatio}</td>
      </tr></tbody></table>`
      , btn: '我知道了',
    });
  }

  getLiftAmount() {
    this.http.userCenter().subscribe(res => {
      this.leftMoney = res['balance'];
      let expandScale = true;
      if (res['allottedScale'] === '0') {
        this.info.cpje = parseInt(res['allottedScale'], 0) + this.info.cpje;
        expandScale = true;
      } else if (this.isAdd === 'true') {
        expandScale = true;
      } else {
        expandScale = false;
      }

      if (this.leftMoney < this.info.bzj) {
        this.data.ErrorMsg('账户余额不足，请充值');
        setTimeout(() => {
          this.data.goto('recharge');
        }, 1000);
      } else {
        const data = {
          newStrategy: res['allottedScale'] !== '0' ? false : true,
          financeRatio: this.peiziData.mulType,
          financePeriod: this.dateText,
          amount: this.peiziData.money,
          expandScale: expandScale
        };
        this.http.deposit(data).subscribe(res2 => {
          this.data.ErrorMsg('申请成功');
          setTimeout(() => {
            history.back();
          }, 1000);
        }, (err) => {
          this.data.error = err.error;
          this.data.isError();
        });
      }
    });
  }
}
