import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModpwdComponent } from './modpwd.component';

describe('ModpwdComponent', () => {
  let component: ModpwdComponent;
  let fixture: ComponentFixture<ModpwdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModpwdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModpwdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
