import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestorLoginPage } from './investor-login.page';

describe('InvestorLoginPage', () => {
  let component: InvestorLoginPage;
  let fixture: ComponentFixture<InvestorLoginPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvestorLoginPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestorLoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
