import { Component } from '@angular/core';
import { LeaderService } from './../leader.service';
import { NhanVienService } from './../nhan-vien.service';
import { NhanVien } from './../nhan-vien';
import { Leader } from '../leader';
import { DuAn } from '../du-an';
import { Router, ActivatedRoute } from '@angular/router';
import { DuAnService } from '../du-an.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-duan-them-reactive',
  templateUrl: './duan-them-reactive.component.html',
  styleUrls: ['./duan-them-reactive.component.css']
})
export class DuanThemReactiveComponent {
  form: FormGroup;
  employees: NhanVien[];
  selectedEmployeeId: number | undefined;
  selectedEmployee: NhanVien | undefined;
  selectedLeaderId: number | undefined;
  selectedLeader: Leader | undefined;
  leaders: Leader[];
  da: DuAn = {
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
    private activeRoute: ActivatedRoute,
    private datePipe: DatePipe,
    private fb: FormBuilder,

  ) {
    this.employees = nhanVienService.listNhanVien;
    this.leaders = leaderService.listLeader;
    // Khởi tạo FormGroup và định nghĩa các FormControl
    this.form = this.fb.group({
      tenDuAn: ['', Validators.required],
      ngayStart: ['', Validators.required],
      tien: [null, Validators.required],
      leader: [null, Validators.required],
      thanhvien: [null, Validators.required]
    });
  }
  ngOnInit(): void {};
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

  CreateProject() {
    if (this.form.valid) {
      // Lấy dữ liệu từ FormGroup và gán vào biến newEmployee
      const newProject: DuAn = {
        id: 0,
         tenDuAn : this.form.get('tenDuAn')?.value,
       ngayStart : this.form.get('ngayStart')?.value,
         tien : Number(this.form.get('tien')?.value),
       leader : Number(this.form.get('leader')?.value),
         thanhvien : [Number(this.form.get('thanhvien')?.value)]
      };
      this.duanService.addProject(newProject);

      // Chuyển hướng đến trang danh sách Nhân viên sau khi thêm thành công
      this.router.navigate(['/duan']);
  }
}
}
