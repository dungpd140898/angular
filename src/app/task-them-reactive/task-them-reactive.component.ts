import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DuAn } from '../du-an';
import { Task } from '../task';
import { Priority } from '../priority';
import { NhanVien } from '../nhan-vien';
import { Router, ActivatedRoute } from '@angular/router';
import { TaskService } from '../task.service';
import { DuAnService } from '../du-an.service';
import { NhanVienService } from '../nhan-vien.service';
import { PriorityService } from '../priority.service';

@Component({
  selector: 'app-task-them-reactive',
  templateUrl: './task-them-reactive.component.html',
  styleUrls: ['./task-them-reactive.component.css']
})
export class TaskThemReactiveComponent {
  form: FormGroup;
  projects: DuAn[];
  selectedProjectId: number | undefined;
  selectedProject: Task | undefined;
  prioritys: Priority[];
  selectedPriorityId: number | undefined;
  selectedPriority: Task | undefined;
  employees: NhanVien[];
  selectedEmployeeId: number | undefined;
  selectedEmployee: Task | undefined;
  taskId: number = Number(this.activeRoute.snapshot.params['id']);
  task: Task = {
    id: 0,
    tenTask: '',
    moTa: '',
    duAnID: 0,
    nhanvienID: 0,
    priority: 0,
    status: 0,
  };
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private taskService: TaskService,
    private priority:PriorityService,
    private duAnService: DuAnService,
    private nhanvienService: NhanVienService
  ){
    this.employees = nhanvienService.listNhanVien;
    this.prioritys = priority.listPriority ;
    this.projects = duAnService.listDuAn;
    this.form = this.fb.group({
      tenTask: ['', Validators.required],
      moTa: ['', Validators.required],
      duAnID: [0],
      nhanvienID: [0],
      priority: [0],
      status: [0],
    });
  }
  ngOnInit(): void {
  }

  themTask() {
    const tenTask = this.form.get('tenTask')?.value;
    const moTa = this.form.get('moTa')?.value;
    const duAnID = Number(this.form.get('duAnID')?.value);
    const nhanvienID = Number(this.form.get('nhanvienID')?.value);
    const priority = Number(this.form.get('priority')?.value);
    const status = 0;
    const updatedTask: Task = {
      id: this.task.id,
      tenTask: tenTask,
      moTa: moTa,
      duAnID: duAnID,
      nhanvienID: nhanvienID,
      priority: priority,
      status: status

    };

    this.taskService.addTask(updatedTask);
    this.router.navigate(['/task']);
  }
}
