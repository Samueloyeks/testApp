import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntrepreneurSignupPage } from './entrepreneur-signup.page';

describe('EntrepreneurSignupPage', () => {
  let component: EntrepreneurSignupPage;
  let fixture: ComponentFixture<EntrepreneurSignupPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntrepreneurSignupPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntrepreneurSignupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
