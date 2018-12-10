import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from './data.service';

@Injectable()
export class HttpService {
  stompClient: any;
  public host = '';
  // public host = 'http://101.132.65.124:10008/option/';
  public ws = '';
  public stockHQ: any;

  constructor(public http: HttpClient, public data: DataService) {
    console.log(location.protocol);
    // this.host = location.protocol + '//218.85.23.217:8082/option/';
    this.host = 'https://biz.hankuntech.com/option/';
    this.ws = this.host + 'webSocket';
  }

  POST(url, data) {
    this.data.getHeader();
    return this.http.post(url, data, this.data.getHeader());
  }

  /**
   * 获取验证码
   */
  getCode(type, phone) {
    return this.http.post(this.host + `public/smsCode/${type}/${phone}`, {});
  }

  /**
   * 资金流水
   */
  getFlow(data) {
    return this.POST(this.host + 'tntg/payOrder/list', data);
  }

  /**
   * 用户注册
   */
  signup(data) {
    return this.http.post(this.host + `public/register`, data);
  }

  /**
 * 用户修改密码
 */
  reset(data) {
    return this.http.post(this.host + `public/pwdResetByVerifyCode`, data);
  }

  /**
   * 资讯列表
   */
  newsList() {
    return this.http.post(this.host + 'tn/quota/newsList', {});
  }

  /**
   * 资讯详情
   */
  newsDetail(id) {
    return this.http.post(this.host + `tn/quota/newsDetail/${id}`, {});
  }

  /**
   * 获取银行列表
   */
  getBankList() {
    return this.POST(this.host + 'tn/banks', {});
  }

  /**
   * 银行转账信息提交
   * @param amount 充值金额
   */
  submitBankTrans(amount, type) {
    return this.POST(this.host + 'tntg/submitBankTrans/' + type, { totalAmount: amount });
  }

  /**
   * 获取银行省份列表
   */
  getProvinceList(bankId) {
    return this.POST(this.host + `tn/banks/${bankId}/provinces`, {});
  }

  /**
 * 获取银行城市列表
 */
  getCityList(bankId, provinceId) {
    return this.POST(this.host + `tn/banks/${bankId}/province/${provinceId}/cities`, {});
  }

  /**
  * 获取银行支行列表
  */
  getBranchList(bankId, provinceId, branchId) {
    return this.POST(this.host + `tn/banks/${bankId}/province/${provinceId}/cities/${branchId}/branches`, {});
  }

  /**
   * 查询银行卡绑定
   */
  getCard() {
    return this.POST(this.host + `tn/query/card`, {});
  }


  /**
   * 绑定银行卡
   * @param data 绑定银行卡
   */
  bandCard(data) {
    return this.POST(this.host + `tn/bind/card`, data);
  }

  /**
   * 充值
   */
  aliPay(moeny) {
    return this.http.post(this.host + `alipay/sign?totalAmount=${moeny}`, {},
      { headers: this.data.getPayHeader(), responseType: 'text' });
  }

  /**
   * 第三方支付
   */
  thirdPay(data) {
    return this.http.post(this.host + 'thirdpay/request', data,
      { headers: { 'Authorization': this.data.getToken() }, responseType: 'text' });
  }

  /**
   * 合约周期
   */
  heyuezhouqi() {
    return this.http.post(this.host + `tn/quota/yymm`, {});
  }

  /**
   * 获取认购/认沽列表
   * @param date 日期
   * @param type 买或卖
   */
  getQuotaList(date, type) {
    return this.http.post(this.host + `tn/quota/yymm/${date}/${type}`, {});
  }

  /**
   * 总体趋势
   */
  generalTrend() {
    return this.http.post(this.host + `tn/quota/generalTrend`, {});
  }

  /**
   * 分时图数组
   */
  fenshituList(optionCode) {
    return this.POST(this.host + `tn/quota/detail/${optionCode}`, {});
  }

  /**
   * 合约列表
   * @Param date
   */
  heyueList(date) {
    return this.http.post(this.host + `tn/quota/yymm/${date}`, {});
  }

  /**
   * 请求股票行情
   */
  getGPHQ(code, token) {
    return this.POST(this.host + `push/subsMarket/${code}?tokenP=${token}`, {});
  }

  /**
 * 获取手续费
 */
  commission() {
    return this.POST(this.host + 'tntg/commission', {});
  }

  /**
   * 获取收款人信息
   */
  getPayCardInfo() {
    return this.POST(this.host + 'tntg/payCardInfo', {});
  }

  /**
   *  静态信息
   * @param code 合约代码
   */
  getStatic(code) {
    return this.POST(this.host + `tn/quota/static/${code}`, {});
  }
  /**
   * 登录接口
   */
  login(data) {
    return this.http.post(this.host + 'tntg/login', data);
  }

  /**
   * 模糊查询股票
   */
  searchStock(code) {
    return this.POST(this.host + 'tntg/stock?input=' + code, {});
  }

  /**
   * 提现
   */
  withdraw(data) {
    return this.POST(this.host + 'tntg/lift', data);
  }

  /**
   * 下单 参数 买入：BUY 卖出：SELL
   */
  order(type, data, stockType) {
    return this.POST(this.host + 'tntg/appoint/' + type + '/' + stockType, data);
  }

  /**
   * 取消订阅
   */
  cancelSubscribe() {
    return this.POST(this.host + 'push/unsubsMarket', {});
  }

  /**
   * 查询持仓
   */
  getHold() {
    return this.POST(this.host + 'tntg/hold', {});
  }

  /**
   * 查询委托
   */
  getAppoint(time) {
    return this.POST(this.host + 'tntg/appointHis?' + time, {});
  }

  /**
   * 个人中心
   */
  userCenter() {
    return this.POST(this.host + 'tntg/capital', {});
  }

  /**
   * 确认撤单
   */
  chedan(code) {
    return this.POST(this.host + 'tntg/cancel/' + code, {});
  }

  /**
   * 自选股订阅
   */
  zixuanSubscribe(string) {
    return this.http.post(this.host + 'push/subscribe/' + string, {}, this.data.getHeader());
  }

  /**
   * 获取自选股行情
   */
  zixuanDetail(string) {
    return this.http.post(this.host + 'push/self/' + string, {}, this.data.getHeader());
  }
}
