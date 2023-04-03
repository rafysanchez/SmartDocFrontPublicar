import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocfiltroComponent } from './docfiltro.component';

describe('DocfiltroComponent', () => {
  let component: DocfiltroComponent;
  let fixture: ComponentFixture<DocfiltroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocfiltroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocfiltroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
