import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorPage400Component } from './error-page400.component';

describe('ErrorPage400Component', () => {
  let component: ErrorPage400Component;
  let fixture: ComponentFixture<ErrorPage400Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErrorPage400Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorPage400Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
