import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestorSignupPage } from './investor-signup.page';

describe('InvestorSignupPage', () => {
  let component: InvestorSignupPage;
  let fixture: ComponentFixture<InvestorSignupPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvestorSignupPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestorSignupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
