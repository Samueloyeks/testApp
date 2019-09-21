import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestmentModalPage } from './investment-modal.page';

describe('InvestmentModalPage', () => {
  let component: InvestmentModalPage;
  let fixture: ComponentFixture<InvestmentModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvestmentModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestmentModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
