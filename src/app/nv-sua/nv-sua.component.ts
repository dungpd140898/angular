import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NhanVien } from '../nhan-vien';
import { NhanVienService } from '../nhan-vien.service';
import { KhuVuc } from '../khu-vuc';
import { Gender } from '../gender';
import { KhuVucService } from '../khu-vuc.service';
import { GenderService } from '../gender.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-nv-sua',
  templateUrl: './nv-sua.component.html',
  styleUrls: ['./nv-sua.component.css']
})
export class NvSuaComponent implements OnInit {
  employees: KhuVuc[];
  selectedEmployeeId: number | undefined;
  genders: Gender[];
  selectedGenderId: number | undefined;
  idNV: number = Number(this.activeRoute.snapshot.params['id']);
  nv: NhanVien = {
    id: 0,
    ho: '',
    ten: '',
    ngaysinh: '',
    phai: 0, // Đảm bảo rằng kiểu dữ liệu ở đây là số nguyên
    khuvuc: 0, // Đảm bảo rằng kiểu dữ liệu ở đây là số nguyên
  };

  constructor(
    private nvService: NhanVienService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private khuVucService: KhuVucService,
    private genderService: GenderService
  ) {
    this.employees = khuVucService.listKhuVuc;
    this.genders = genderService.listGender;
  }

  ngOnInit(): void {
    let kq = this.nvService.getMotNhanVien(this.idNV);
    this.nv = kq as NhanVien;
  }

  getSelectedEmployeeName(selectedEmployeeId: number): string {
    const selectedEmployee = this.employees.find(employee => employee.id === selectedEmployeeId);
    if (selectedEmployee) {
      return `${selectedEmployee.tenKhuVuc}`;
    }
    return '';
  }

  getSelectedGenderName(selectedGenderId: number): string {
    const selectedGender = this.genders.find(gender => gender.id === selectedGenderId);
    if (selectedGender) {
      return `${selectedGender.namegender}`;
    }
    return '';
  }

  capnhatNV(){
    this.nv.phai = Number(this.selectedGenderId) || 0;
    this.nv.khuvuc = Number(this.selectedEmployeeId) || 0;

console.log(this.nv);

    this.nvService.capnhatNhanVien(this.nv);
    this.router.navigate(['/nhanvien']);
  }

}
