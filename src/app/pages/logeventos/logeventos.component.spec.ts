import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogeventosComponent } from './logeventos.component';

describe('LogeventosComponent', () => {
  let component: LogeventosComponent;
  let fixture: ComponentFixture<LogeventosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogeventosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogeventosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
