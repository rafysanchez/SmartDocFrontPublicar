import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardAdmComponent } from './dashboardAdm.component';

describe('DashboardComponent', () => {
  let component: DashboardAdmComponent;
  let fixture: ComponentFixture<DashboardAdmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardAdmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardAdmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
