import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectInterestsPage } from './select-interests.page';

describe('SelectInterestsPage', () => {
  let component: SelectInterestsPage;
  let fixture: ComponentFixture<SelectInterestsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectInterestsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectInterestsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
