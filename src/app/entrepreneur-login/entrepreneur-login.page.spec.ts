import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntrepreneurLoginPage } from './entrepreneur-login.page';

describe('EntrepreneurLoginPage', () => {
  let component: EntrepreneurLoginPage;
  let fixture: ComponentFixture<EntrepreneurLoginPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntrepreneurLoginPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntrepreneurLoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
