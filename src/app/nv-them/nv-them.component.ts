import { Component } from '@angular/core';
import { KhuVuc } from '../khu-vuc';
import { KhuVucService } from '../khu-vuc.service';
import { Gender } from '../gender';
import { GenderService } from '../gender.service';
import { NhanVienService } from '../nhan-vien.service'; // Import service cho Nhân viên
import { Router } from '@angular/router'; // Import Router
import { NhanVien } from '../nhan-vien';

@Component({
  selector: 'app-nv-them',
  templateUrl: './nv-them.component.html',
  styleUrls: ['./nv-them.component.css']
})
export class NvThemComponent {
  employees: KhuVuc[];
  selectedEmployeeId: number | undefined;
  genders: Gender[];
  selectedGenderId: number | undefined;

  // Tạo một biến chứa dữ liệu của Nhân viên mới
  newEmployee: NhanVien = {
    id: 0, // ID sẽ được tạo tự động
    ho: '',
    ten: '',
    ngaysinh: '',
    phai: 0, // Sẽ lưu selectedGenderId
    khuvuc: 0 // Sẽ lưu selectedEmployeeId
  };

  constructor(
    private khuVucService: KhuVucService,
    private genderService: GenderService,
    private nhanVienService: NhanVienService, // Inject service của Nhân viên
    private router: Router // Inject Router
  ) {
    this.employees = khuVucService.listKhuVuc;
    this.genders = genderService.listGender;
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

  onSubmit() {
    // Lấy dữ liệu từ form và gán vào biến newEmployee
    this.newEmployee.phai = Number(this.selectedGenderId) || 0;
    this.newEmployee.khuvuc = Number(this.selectedEmployeeId) || 0;
console.log(this.newEmployee);

    // Gọi service để thêm Nhân viên
    this.nhanVienService.addNhanVien(this.newEmployee);

    // Sau khi thêm, bạn có thể đặt lại các trường dữ liệu trên biểu mẫu
    this.selectedEmployeeId = undefined;
    this.selectedGenderId = undefined;

    // Chuyển hướng đến trang danh sách Nhân viên sau khi thêm thành công
    this.router.navigate(['/nhanvien']);
  }
}
