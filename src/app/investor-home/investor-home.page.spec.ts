import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestorHomePage } from './investor-home.page';

describe('InvestorHomePage', () => {
  let component: InvestorHomePage;
  let fixture: ComponentFixture<InvestorHomePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvestorHomePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestorHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
