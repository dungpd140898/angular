import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NvThemReactiveComponent } from './nv-them-reactive.component';

describe('NvThemReactiveComponent', () => {
  let component: NvThemReactiveComponent;
  let fixture: ComponentFixture<NvThemReactiveComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NvThemReactiveComponent]
    });
    fixture = TestBed.createComponent(NvThemReactiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
