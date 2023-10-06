import { SearchService } from './../search.service';
import { NhanVien } from './../nhan-vien';
import { Component } from '@angular/core';
import { Task} from '../task'
import { NhanVienService } from '../nhan-vien.service';
import { DuAnService } from '../du-an.service';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent {
  getPriorityName(priority: number): string {
    switch (priority) {
      case 0:
        return 'Thấp';
      case 1:
        return 'Trung bình';
      case 2:
        return 'Cao';
      default:
        return 'Không xác định';
    }
  }
  getStatusName(priority: number): string {
    switch (priority) {
      case 0:
        return 'Chưa thực hiện';
      case 1:
        return 'Đang thực hiện';
      case 2:
        return 'Đã hoàn thành';
      default:
        return 'Không xác định';
    }
  }
  listTask: Task[] = [];
    // Inject NvListComponent để có thể sử dụng danh sách người thực hiện
   constructor(
    private nhanVienService: NhanVienService,
    private daService:DuAnService,
    private searchService:SearchService,
    private taskService: TaskService
    ) {}

  getEmployeeName(employeeID: number): string {
    const employee = this.nhanVienService.getEmployeeById(employeeID);
   if(employee){
    return `${employee.ho} ${employee.ten}`
   }else{
    return `Tên không xác định`
   }
  }
  getDuAnName(duAnID: number): string {
    const employee = this.daService.getDuAnById(duAnID);
   if(employee){
    return `${employee.tenDuAn} `
   }else{
    return `Tên không xác định`
   }
  }

  tasks: Task[] = [];
  ngOnInit(): void {
    const allNames: string[] = [];

// Lặp qua danh sách các task để lấy tên dự án và tên nhân viên
  this.taskService.listTask.forEach(task => {
  const duAnName = this.getDuAnName(task.duAnID);
  const nhanVienName = this.getEmployeeName(task.nhanvienID);

  // Thêm tên dự án và tên nhân viên vào danh sách chung
  allNames.push(duAnName, nhanVienName);
});

// Loại bỏ các giá trị trùng lặp và sắp xếp danh sách
const uniqueNames = [...new Set(allNames)].sort();

    this.searchService.getSearchKeyword().subscribe(keyword => {
      // Tìm kiếm và cập nhật danh sách sản phẩm dựa trên từ khóa
      this.filterHeader(keyword);
    });
  }
  filterHeader(keyword: string) {
    if (!keyword) {
      this.tasks = this.taskService.listTask; // Nếu từ khóa rỗng, hiển thị toàn bộ danh sách công việc
    } else {
      // Sử dụng phương thức filter để lọc danh sách công việc dựa trên từ khóa
      this.tasks = this.taskService.listTask.filter(task =>
        task.tenTask.toLowerCase().includes(keyword.toLowerCase()) ||
        this.getDuAnName(task.duAnID).toLowerCase().includes(keyword.toLowerCase()) ||
        this.getEmployeeName(task.nhanvienID).toLowerCase().includes(keyword.toLowerCase())
      );
    }
  }
  xoaTask(id: number = 0) {
    const confirmed = window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này?');
    if (confirmed) {
        this.taskService.xoaTask(id);
    }
    return false;
  }
  p:number = 1;
  itemsPerPage:number = 3;
  totalNV:any;

}
