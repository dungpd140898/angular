import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskThemReactiveComponent } from './task-them-reactive.component';

describe('TaskThemReactiveComponent', () => {
  let component: TaskThemReactiveComponent;
  let fixture: ComponentFixture<TaskThemReactiveComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaskThemReactiveComponent]
    });
    fixture = TestBed.createComponent(TaskThemReactiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
