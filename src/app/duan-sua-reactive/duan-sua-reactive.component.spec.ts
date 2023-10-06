import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DuanSuaReactiveComponent } from './duan-sua-reactive.component';

describe('DuanSuaReactiveComponent', () => {
  let component: DuanSuaReactiveComponent;
  let fixture: ComponentFixture<DuanSuaReactiveComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DuanSuaReactiveComponent]
    });
    fixture = TestBed.createComponent(DuanSuaReactiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
