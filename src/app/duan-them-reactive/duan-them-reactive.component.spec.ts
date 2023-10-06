import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DuanThemReactiveComponent } from './duan-them-reactive.component';

describe('DuanThemReactiveComponent', () => {
  let component: DuanThemReactiveComponent;
  let fixture: ComponentFixture<DuanThemReactiveComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DuanThemReactiveComponent]
    });
    fixture = TestBed.createComponent(DuanThemReactiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
