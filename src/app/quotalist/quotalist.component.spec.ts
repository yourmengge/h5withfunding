import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotalistComponent } from './quotalist.component';

describe('QuotalistComponent', () => {
  let component: QuotalistComponent;
  let fixture: ComponentFixture<QuotalistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuotalistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuotalistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
