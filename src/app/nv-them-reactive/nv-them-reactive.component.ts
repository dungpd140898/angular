import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Import các modules liên quan đến Reactive Forms
import { KhuVuc } from '../khu-vuc';
import { KhuVucService } from '../khu-vuc.service';
import { Gender } from '../gender';
import { GenderService } from '../gender.service';
import { NhanVienService } from '../nhan-vien.service';
import { Router } from '@angular/router';
import { NhanVien } from '../nhan-vien';

@Component({
  selector: 'app-nv-them',
  templateUrl: './nv-them-reactive.component.html',
  styleUrls: ['./nv-them-reactive.component.css']
})
export class NvThemReactiveComponent implements OnInit {
  employees: KhuVuc[];
  genders: Gender[];
  form: FormGroup; // Khai báo FormGroup để quản lý form

  constructor(
    private khuVucService: KhuVucService,
    private genderService: GenderService,
    private nhanVienService: NhanVienService,
    private router: Router,
    private formBuilder: FormBuilder // Inject FormBuilder
  ) {
    this.employees = khuVucService.listKhuVuc;
    this.genders = genderService.listGender;

    // Khởi tạo FormGroup và định nghĩa các FormControl
    this.form = this.formBuilder.group({
      ho: ['', Validators.required],
      ten: ['', Validators.required],
      ngaysinh: ['', Validators.required],
      phai: [null, Validators.required],
      khuvuc: [null, Validators.required]
    });
  }

  ngOnInit(): void {}

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

  onSubmit() {
    if (this.form.valid) {
      // Lấy dữ liệu từ FormGroup và gán vào biến newEmployee
      const newEmployee: NhanVien = {
        id: 0,
        ho: this.form.get('ho')!.value,
        ten: this.form.get('ten')!.value,
        ngaysinh: this.form.get('ngaysinh')!.value,
        phai: Number(this.form.get('phai')!.value),
        khuvuc: Number(this.form.get('khuvuc')!.value),
      };

      // Gọi service để thêm Nhân viên
      this.nhanVienService.addNhanVien(newEmployee);

      // Chuyển hướng đến trang danh sách Nhân viên sau khi thêm thành công
      this.router.navigate(['/nhanvien']);
    }
  }
}
