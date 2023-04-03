import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntmailComponent } from './intmail.component';

describe('IntmailComponent', () => {
  let component: IntmailComponent;
  let fixture: ComponentFixture<IntmailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntmailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
