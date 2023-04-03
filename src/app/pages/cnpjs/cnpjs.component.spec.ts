import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CnpjsComponent } from './cnpjs.component';

describe('CnpjsComponent', () => {
  let component: CnpjsComponent;
  let fixture: ComponentFixture<CnpjsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CnpjsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CnpjsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
