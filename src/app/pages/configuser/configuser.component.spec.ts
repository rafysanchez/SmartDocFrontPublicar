import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfiguserComponent } from './configuser.component';

describe('ConfiguserComponent', () => {
  let component: ConfiguserComponent;
  let fixture: ComponentFixture<ConfiguserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfiguserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfiguserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
