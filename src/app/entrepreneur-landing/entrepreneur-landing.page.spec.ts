import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntrepreneurLandingPage } from './entrepreneur-landing.page';

describe('EntrepreneurLandingPage', () => {
  let component: EntrepreneurLandingPage;
  let fixture: ComponentFixture<EntrepreneurLandingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntrepreneurLandingPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntrepreneurLandingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
