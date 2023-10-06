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
  selector: 'app-duan-sua-reactive',
  templateUrl: './duan-sua-reactive.component.html',
  styleUrls: ['./duan-sua-reactive.component.css']
})
export class DuanSuaReactiveComponent {
  form: FormGroup;
  employees: NhanVien[];
  selectedEmployeeId: number | undefined;
  selectedEmployee: NhanVien | undefined;
  selectedLeaderId: number | undefined;
  selectedLeader: Leader | undefined;
  leaders: Leader[];
  ProJectID: number = Number(this.activeRoute.snapshot.params['id']);
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
    const ngayStart = this.da.ngayStart; // Đã có giá trị "2001-1-3"
    const formattedNgayStart = this.datePipe.transform(ngayStart, 'dd/MM/yyyy');
    this.form = this.fb.group({
      tenDuAn: ['', Validators.required],
      ngayStart: formattedNgayStart,
      tien: 0,
      leader: 0,
      thanhvien: [0]
    });
  }
  ngOnInit(): void {
    let kq = this.duanService.getDuAnById(this.ProJectID);
    this.da = kq as DuAn;
    this.form.patchValue(this.da);
    console.log(kq);

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
    const tenDuAn = this.form.get('tenDuAn')?.value;
    const ngayStart = this.form.get('ngayStart')?.value;
    const tien = Number(this.form.get('tien')?.value);
    const leader = Number(this.form.get('leader')?.value);
    const thanhvien = [Number(this.form.get('thanhvien')?.value)];


    const ngayStartFormatted = this.datePipe.transform(ngayStart, 'dd/MM/yyyy');

    const updatedProject: DuAn = {
      id: this.da.id,
      tenDuAn: tenDuAn,
      ngayStart: ngayStartFormatted,
      tien: tien,
      leader: leader,
      thanhvien: thanhvien

    };

    this.duanService.updateProject(updatedProject);
    this.router.navigate(['/duan']);
  }
}

