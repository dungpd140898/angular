import { Component } from '@angular/core';
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
  selector: 'app-task-sua',
  templateUrl: './task-sua.component.html',
  styleUrls: ['./task-sua.component.css']
})
export class TaskSuaComponent {
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
  }
  ngOnInit(): void {
    let kq = this.taskService.getTaskById(this.taskId);
    this.task = kq as Task;
  }
  getSelectedProjectName(selectedProjectId: number): string {
    const selectedProJect = this.projects.find(project => project.id === selectedProjectId);
    if (selectedProJect) {
      return `${selectedProJect.tenDuAn}`;
    }
    return '';
  }


  getSelectedPriorityName(selectedPriorityId: number): string {
    const selectedPriority = this.prioritys.find(priority => priority.id === selectedPriorityId);
    if (selectedPriority ) {
      return `${selectedPriority .namePriority}`;
    }
    return '';
  }
  getSelectedEmpolyeetName(selectedEmployeeId: number): string {
    const selectedEmployee = this.employees.find(employee => employee.id === selectedEmployeeId);
    if (selectedEmployee) {
      return `${selectedEmployee.ho} ${selectedEmployee.ten}`;
    }
    return '';
  }
  capnhatTask(){
     // Lấy dữ liệu từ form và gán vào biến newEmployee
     this.task.duAnID = Number(this.selectedProjectId) || 0;
     this.task.priority = Number(this.selectedPriorityId) || 0;
     this.task.nhanvienID = Number(this.selectedEmployeeId) || 0;

    this.taskService.capnhatTask(this.task);
    this.router.navigate(['/task']);
  }
}
