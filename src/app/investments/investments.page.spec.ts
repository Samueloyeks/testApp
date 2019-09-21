import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestmentsPage } from './investments.page';

describe('InvestmentsPage', () => {
  let component: InvestmentsPage;
  let fixture: ComponentFixture<InvestmentsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvestmentsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestmentsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
