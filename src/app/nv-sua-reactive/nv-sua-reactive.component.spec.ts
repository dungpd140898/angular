import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NvSuaReactiveComponent } from './nv-sua-reactive.component';

describe('NvSuaReactiveComponent', () => {
  let component: NvSuaReactiveComponent;
  let fixture: ComponentFixture<NvSuaReactiveComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NvSuaReactiveComponent]
    });
    fixture = TestBed.createComponent(NvSuaReactiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
