import { Injectable } from '@angular/core';
import { Task } from './task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  listTask:Task[] = [
    {id:1, tenTask:'Phân tích yêu cầu', duAnID:1, nhanvienID:1,moTa:"Phân tích các yêu cầu của khách hàng để team thực hiện",status:0,priority:1 },
    {id:2, tenTask:'Thực hiện layout cho ứng dụng', duAnID:1, nhanvienID:2,moTa:"Thực hiện layout website, chú ý kỹ responsive",status:2,priority:1 },
    {id:3, tenTask:'Tìm hiểu yêu cầu của khách hàng', duAnID:2, nhanvienID:3,moTa:"Đến công ty và ghi nhận các yêu cầu của khách hàng",status:1,priority:2 },
    {id:4, tenTask:'Đăng ký thành viên', duAnID:3, nhanvienID:4,moTa:"Thực hiện chức năng đăng ký, có capcha, mail kích hoạt",status:1,priority:1 },
    {id:5, tenTask:'Đổi pass, quên pass', duAnID:1, nhanvienID:4,moTa:"Thực hiện chức năng đỗi pass, quên pass. Nhớ kiểm tra user login, email tồn tại, pass cũ hợp lệ ",status:0,priority:1 },
    {id:6, tenTask:'Testing 1', duAnID:4, nhanvienID:3,moTa:"Kiểm tra mọi form chức năng theo các case đã liệt kê",status:0,priority:2 },
    {id:7, tenTask:'Triển khai website', duAnID:5, nhanvienID:4,moTa:"Triển khai website lên hosting đã mua",status:2,priority:2 },
    {id:8, tenTask:'Hướng dẫn sử dụng và bàn giao', duAnID:5, nhanvienID:1,moTa:"Hướng dẫn sử dụng cho khách hàng",status:2,priority:2 },
    {id:9, tenTask:'Testing 2', duAnID:4, nhanvienID:2,moTa:"Kiểm tra các tính năng bảo mật theo các yêu cầu đã nêu trong tài liệu dự án",status:1,priority:2 },
  ]
  constructor() { }
  getTotalTask(): number {
    return this.listTask.length;
  }
  getTotalTaskByProjectId(projectId: number): number {
    return this.listTask.filter(task => task.duAnID === projectId).length;
  }
  getTaskById(id: number) {
    return this.listTask.find(task => task.id === id);
  }

  getMaxId(): number {
    let maxId = 0;
    for (const task of this.listTask) {
      if (task.id && task.id > maxId) {
        maxId = task.id;
      }
    }
    return maxId;
  }
  addTask(task: Task) {
    // Gán ID cho nhân viên mới bằng giá trị lớn nhất hiện có cộng thêm 1
    task.id = this.getMaxId() + 1;
    // Thêm nhân viên vào danh sách
    this.listTask.push(task);
  }
  capnhatTask(task:  Task = <Task>{}): void {
    if (task.id == null) {
      console.error('ID của nhân viên không được null hoặc undefined.');
      return;
    }

    const index = this.listTask.findIndex(p => p.id === task.id);

    if (index === -1) {
      console.error('Không tìm thấy nhân viên với ID tương ứng.');
      return;
    }

    this.listTask[index] = task;
  }
  xoaTask(id: number = 0) {
    let index = this.listTask.findIndex(p => p.id === id);
    if (index !== -1) {
      this.listTask.splice(index, 1); // Use splice to remove 1 element at the found index
    }
  }
}
