
import { PriorityService } from './../priority.service';
import { TaskService } from './../task.service';
import { Component } from '@angular/core';
import { Task } from '../task';
import { Priority } from '../priority';
import { DuAn } from '../du-an';
import { DuAnService } from '../du-an.service';
import { Router } from '@angular/router';
import { NhanVien } from '../nhan-vien';
import { NhanVienService } from '../nhan-vien.service';

@Component({
  selector: 'app-task-them',
  templateUrl: './task-them.component.html',
  styleUrls: ['./task-them.component.css']
})
export class TaskThemComponent {

  projects: DuAn[];
  selectedProjectId: number | undefined;
  selectedProject: Task | undefined;
  prioritys: Priority[];
  selectedPriorityId: number | undefined;
  selectedPriority: Task | undefined;
  employees: NhanVien[];
  selectedEmployeeId: number | undefined;
  selectedEmployee: Task | undefined;
  newTask: Task = {
    id: 0,
    tenTask: '',
    moTa: '',
    duAnID: 0,
    nhanvienID: 0,
    priority: 0,
    status: 0,


  };

  constructor(
    private taskService: TaskService,
    private priority:PriorityService,
    private duAnService: DuAnService,
    private router: Router,
    private nhanvienService: NhanVienService
    ) {
    this.employees = nhanvienService.listNhanVien;
    this.prioritys = priority.listPriority ;
    this.projects = duAnService.listDuAn;

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

  onSubmitTask() {
    // Lấy dữ liệu từ form và gán vào biến newEmployee
    this.newTask.duAnID = Number(this.selectedProjectId) || 0;
    this.newTask.priority = Number(this.selectedPriorityId) || 0;
    this.newTask.nhanvienID = Number(this.selectedEmployeeId) || 0;
    console.log(this.newTask);
    // Gọi service để thêm Nhân viên
    this.taskService.addTask(this.newTask);
    // Chuyển hướng đến trang danh sách Nhân viên sau khi thêm thành công
    this.router.navigate(['/task']);
  }
}
