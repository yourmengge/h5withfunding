import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ClipboardModule } from 'ngx-clipboard';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { UsercenterComponent } from './usercenter/usercenter.component';
import { DataService } from './data.service';
import { MainComponent } from './main/main.component';
import { FooterComponent } from './footer/footer.component';
import { JiaoyiComponent } from './jiaoyi/jiaoyi.component';
import { ZixuanComponent } from './zixuan/zixuan.component';
import { BuyComponent } from './buy/buy.component';
import { ChedanComponent } from './chedan/chedan.component';
import { ChicangComponent } from './chicang/chicang.component';
import { SearchComponent } from './search/search.component';
import { CclbComponent } from './cclb/cclb.component';
import { SsgpComponent } from './ssgp/ssgp.component';
import { HttpService } from './http.service';
import { AlertComponent } from './alert/alert.component';
import { LoadingComponent } from './loading/loading.component';
import { NumIntPipe } from './num-int.pipe';
import { ToFixedPipe } from './to-fixed.pipe';
import { Round4Pipe } from './round4.pipe';
import { ChartComponent } from './chart/chart.component';
import { RechargeComponent } from './recharge/recharge.component';
import { WithdrawComponent } from './withdraw/withdraw.component';
import { CardComponent } from './card/card.component';
import { TransferComponent } from './transfer/transfer.component';
import { BankcardComponent } from './bankcard/bankcard.component';
import { IndexComponent } from './index/index.component';
import { SignupComponent } from './signup/signup.component';
import { NewsDetailComponent } from './news-detail/news-detail.component';
import { CapitalFlowComponent } from './capital-flow/capital-flow.component';
import { QrcodeComponent } from './qrcode/qrcode.component';
import { DetailComponent } from './detail/detail.component';
import { StrategyComponent } from './strategy/strategy.component';
import { ChujinComponent } from './chujin/chujin.component';
import { SettingComponent } from './setting/setting/setting.component';
import { ResetPwdComponent } from './setting/reset-pwd/reset-pwd.component';
import { DepositComponent } from './deposit/deposit.component';
import { UserDetailComponent } from './setting/user-detail/user-detail.component';
import { SettlementComponent } from './settlement/settlement.component';
import { SettledetailComponent } from './settledetail/settledetail.component';

const jiaoyiChildRoutes: Routes = [
  { path: 'chicang', component: ChicangComponent },
  { path: 'chedan', component: ChedanComponent },
  { path: 'search', component: SearchComponent },
  { path: 'sell', component: BuyComponent },
  { path: 'buy', component: BuyComponent },
  { path: '', redirectTo: 'buy', pathMatch: 'full' }
];

const appChildRoutes: Routes = [
  { path: 'index', component: IndexComponent },
  { path: 'chicang', component: ChicangComponent },
  { path: 'usercenter', component: UsercenterComponent },
  { path: 'ssgp', component: SsgpComponent },
  { path: 'zixuan', component: ZixuanComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'forget', component: SignupComponent },
  { path: 'jiaoyi', component: JiaoyiComponent, children: jiaoyiChildRoutes },
  { path: '', redirectTo: 'index', pathMatch: 'full' }
];

const appRoutes: Routes = [
  { path: 'qrcode/:id', component: QrcodeComponent },
  { path: 'chujin', component: ChujinComponent },
  { path: 'settledetail', component: SettledetailComponent },
  { path: 'settlement', component: SettlementComponent },
  { path: 'userDetail', component: UserDetailComponent },
  { path: 'capitalflow', component: CapitalFlowComponent },
  { path: 'strategy', component: StrategyComponent },
  { path: 'bankcard', component: BankcardComponent },
  { path: 'resetPwd', component: ResetPwdComponent },
  { path: 'setting', component: SettingComponent },
  { path: 'deposit', component: DepositComponent },
  { path: 'detail', component: DetailComponent },
  { path: 'transfer', component: TransferComponent },
  { path: 'withdraw', component: WithdrawComponent },
  { path: 'recharge', component: RechargeComponent },
  { path: 'card', component: CardComponent },
  { path: 'chart', component: ChartComponent },
  { path: 'usercenter', component: UsercenterComponent },
  { path: 'main', component: MainComponent, children: appChildRoutes },
  { path: 'newdetail/:id', component: NewsDetailComponent },
  { path: '', redirectTo: 'main', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UsercenterComponent,
    MainComponent,
    FooterComponent,
    JiaoyiComponent,
    ZixuanComponent,
    BuyComponent,
    ChedanComponent,
    ChicangComponent,
    SearchComponent,
    CclbComponent,
    SsgpComponent,
    AlertComponent,
    LoadingComponent,
    NumIntPipe,
    ToFixedPipe,
    Round4Pipe,
    ChartComponent,
    RechargeComponent,
    WithdrawComponent,
    CardComponent,
    TransferComponent,
    BankcardComponent,
    IndexComponent,
    SignupComponent,
    NewsDetailComponent,
    CapitalFlowComponent,
    QrcodeComponent,
    DetailComponent,
    StrategyComponent,
    ChujinComponent,
    SettingComponent,
    ResetPwdComponent,
    DepositComponent,
    UserDetailComponent,
    SettlementComponent,
    SettledetailComponent
  ],
  imports: [
    BrowserAnimationsModule,
    NoopAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    ClipboardModule,
    RouterModule.forRoot(appRoutes, { enableTracing: true, useHash: true }),
  ],
  providers: [DataService, HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
