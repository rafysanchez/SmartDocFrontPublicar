import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PesqchaveComponent } from './pesqchave.component';

describe('PesqchaveComponent', () => {
  let component: PesqchaveComponent;
  let fixture: ComponentFixture<PesqchaveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PesqchaveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PesqchaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
