import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { DataService } from '../data.service';

@Component({
  selector: 'app-chicang',
  templateUrl: './chicang.component.html',
  styleUrls: ['./chicang.component.css']
})
export class ChicangComponent implements OnInit {
  public userInfo: DataService['userInfo'];
  isJiaoyi: any;
  constructor(public data: DataService, public http: HttpService) { }

  ngOnInit() {
    if (this.data.getUrl(2) === 'chicang') {
      this.isJiaoyi = false;
    } else {
      this.isJiaoyi = true;
    }
    this.userInfo = this.data.userInfo;
    this.usercenter();

  }

  overflow(type) {
    if (!type) {
      return 'chicang';
    } else {
      return '';
    }
  }

  usercenter() {
    this.http.userCenter().subscribe((res: DataService['userInfo']) => {
      this.userInfo = res;
      this.data.intervalCapital = setTimeout(() => {
        this.usercenter();
      }, 3000);
    }, (err) => {
      this.data.error = err.error;
      this.data.isError();
    }, () => {
      this.data.Loading(this.data.hide);
    });
  }
}
