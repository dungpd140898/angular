import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskSuaReactiveComponent } from './task-sua-reactive.component';

describe('TaskSuaReactiveComponent', () => {
  let component: TaskSuaReactiveComponent;
  let fixture: ComponentFixture<TaskSuaReactiveComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaskSuaReactiveComponent]
    });
    fixture = TestBed.createComponent(TaskSuaReactiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
