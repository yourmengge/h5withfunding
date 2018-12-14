import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { DataService } from '../data.service';

@Component({
  selector: 'app-ssgp',
  templateUrl: './ssgp.component.html',
  styleUrls: ['./ssgp.component.css']
})
export class SsgpComponent implements OnInit {
  stockCode = '';
  list: any;
  zixuanList = '';
  zixuanArray = [];
  localStorge = `zixuan${this.data.getSession('opUserCode')}`;
  constructor(public data: DataService, public http: HttpService) {

  }

  ngOnInit() {
    this.data.clearInterval();
  }

  close() {
    history.go(-1);
    // localStorage.removeItem('zixuan');
  }

  /**
 * 获取行情快照
 */
  getQuotation() {
    const content = null;
    this.http.searchStock(this.stockCode).subscribe((res) => {
      this.list = res;
    }, (err) => {
      this.data.error = err.error;
      this.data.isError();
    });
  }

  /**
   * 添加自选股
   */
  add(code) {
    if (!this.data.isNull(this.data.getLocalStorage(this.localStorge))) {
      this.zixuanList = this.data.getLocalStorage(this.localStorge);
    }
    this.zixuanArray = this.zixuanList.split(',');
    for (const i in this.zixuanArray) {
      if (code === this.zixuanArray[i]) {
        this.data.ErrorMsg('该股票已添加');
        return;
      }
    }
    if (this.zixuanList === '') {
      this.zixuanList = `${this.data.opUserCode},${code}`;
    } else {
      this.zixuanList = `${this.zixuanList},${code}`;
    }

    this.data.ErrorMsg('添加成功');
    this.data.setLocalStorage(this.localStorge, this.zixuanList);
    console.log(this.zixuanList);
  }

  goto2(code) {
    this.data.setSession('optionCode', code);
    this.data.goto('chart');
  }

}
