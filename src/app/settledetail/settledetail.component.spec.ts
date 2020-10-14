import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettledetailComponent } from './settledetail.component';

describe('SettledetailComponent', () => {
  let component: SettledetailComponent;
  let fixture: ComponentFixture<SettledetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettledetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettledetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
