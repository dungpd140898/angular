import { Component } from '@angular/core';
import { LeaderService } from './../leader.service';
import { NhanVienService } from './../nhan-vien.service';
import { NhanVien } from './../nhan-vien';
import { Leader } from '../leader';
import { DuAn } from '../du-an';
import { Router, ActivatedRoute } from '@angular/router';
import { DuAnService } from '../du-an.service';
@Component({
  selector: 'app-duan-sua',
  templateUrl: './duan-sua.component.html',
  styleUrls: ['./duan-sua.component.css']
})
export class DuanSuaComponent {
  employees: NhanVien[];
  selectedEmployeeId: number | undefined;
  selectedEmployee: NhanVien | undefined;
  selectedLeaderId: number | undefined;
  selectedLeader: Leader | undefined;
  leaders: Leader[];
  ProJectID: number = Number(this.activeRoute.snapshot.params['id']);
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
    private duanService: DuAnService,
    private activeRoute: ActivatedRoute

  ) {
    this.employees = nhanVienService.listNhanVien;
    this.leaders = leaderService.listLeader;
  }
  ngOnInit(): void {
    let kq = this.duanService.getDuAnById(this.ProJectID);
    this.newProject = kq as DuAn;
  };
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

  updateProject() {
    // Lấy dữ liệu từ form và gán vào biến newEmployee
    if (this.selectedEmployeeId) {
      this.newProject.thanhvien = [Number(this.selectedEmployeeId)];
    }

    this.newProject.leader = Number(this.selectedLeaderId) || 0;

    console.log(this.newProject);

    // Gọi service để thêm Dự án
    this.duanService.updateProject(this.newProject);

    // Sau khi thêm, bạn có thể đặt lại các trường dữ liệu trên biểu mẫu
    this.selectedEmployeeId = undefined;
    this.selectedLeaderId = undefined;

    // Chuyển hướng đến trang danh sách Dự án sau khi thêm thành công
    this.router.navigate(['/duan']);
  }
}
