import { LeaderService } from './../leader.service';
import { NhanVienService } from './../nhan-vien.service';
import { Component } from '@angular/core';
import { NhanVien } from './../nhan-vien';
import { Leader } from '../leader';
import { DuAn } from '../du-an';
import { Router } from '@angular/router';
import { DuAnService } from '../du-an.service';

@Component({
  selector: 'app-duan-them',
  templateUrl: './duan-them.component.html',
  styleUrls: ['./duan-them.component.css']
})
export class DuanThemComponent {
  employees: NhanVien[];
  selectedEmployeeId: number | undefined;
  selectedEmployee: NhanVien | undefined;
  selectedLeaderId: number | undefined;
  selectedLeader: Leader | undefined;
  leaders: Leader[];
  newProject: DuAn = {
    id: 0,
    tenDuAn: '',
    ngayStart: '',
    tien: 0,
    leader: 0, // Sửa dòng này để leader là một mảng số nguyên
    thanhvien: [0]
  };

  constructor(
    private nhanVienService: NhanVienService,
    private leaderService: LeaderService,
    private router: Router,
    private duanService: DuAnService

  ) {
    this.employees = nhanVienService.listNhanVien;
    this.leaders = leaderService.listLeader;
  }

  getSelectedEmployeeName(selectedEmployeeId: number): string {
    const selectedEmployee = this.employees.find(employee => employee.id === selectedEmployeeId);
    if (selectedEmployee) {
      return `${selectedEmployee.ho} ${selectedEmployee.ten}`;
    }
    return '';
  }

  getSelectedLeaderName(selectedLeaderId: number): string {
    const selectedLeader = this.leaders.find(leader => leader.id === selectedLeaderId);
    if (selectedLeader) {
      return `${selectedLeader.name}`;
    }
    return '';
  }

  onSubmit() {
    // Lấy dữ liệu từ form và gán vào biến newEmployee
    if (this.selectedEmployeeId) {
      this.newProject.thanhvien = [Number(this.selectedEmployeeId)];
    }

    this.newProject.leader = Number(this.selectedLeaderId) || 0;

    console.log(this.newProject);

    // Gọi service để thêm Dự án
    this.duanService.addProject(this.newProject);

    // Sau khi thêm, bạn có thể đặt lại các trường dữ liệu trên biểu mẫu
    this.selectedEmployeeId = undefined;
    this.selectedLeaderId = undefined;

    // Chuyển hướng đến trang danh sách Dự án sau khi thêm thành công
    this.router.navigate(['/duan']);
  }
}
