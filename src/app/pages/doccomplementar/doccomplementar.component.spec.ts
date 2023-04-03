import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoccomplementarComponent } from './doccomplementar.component';

describe('DoccomplementarComponent', () => {
  let component: DoccomplementarComponent;
  let fixture: ComponentFixture<DoccomplementarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoccomplementarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoccomplementarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
