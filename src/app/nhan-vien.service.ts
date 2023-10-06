import { Injectable } from '@angular/core';
import { NhanVien } from './nhan-vien';

@Injectable({
  providedIn: 'root'
})
export class NhanVienService {
  listNhanVien:NhanVien[] =[
    { id:1, ho:'Nguyễn Bá',ten:'Đạo', ngaysinh:'2001-1-3', phai:1,khuvuc:1},
    { id:2, ho:'Phạm Kỷ',ten:'Luật', ngaysinh:'2001-5-6', phai:1,khuvuc:1},
    { id:3, ho:'Mai Thanh',ten:'Toán', ngaysinh:'2002-6-15', phai:1,khuvuc:3},
    { id:4, ho:'Cao Thị Chót',ten:'Vót', ngaysinh:'2002-8-19', phai:2,khuvuc:3},
    { id:5, ho:'Mai Phạt Sáu',ten:'Ngàn', ngaysinh:'2001-2-28', phai:2,khuvuc:2},
  ]

  constructor() {}
  getEmployeeById(id: number) {
    return this.listNhanVien.find(employee => employee.id === id);
  }
  getMotNhanVien(id:number=0){
    return this.listNhanVien.find(nv => nv.id == id)
  }
  getTotalNv(): number {
    return this.listNhanVien.length;
  }
  getMaxId(): number {
    let maxId = 0;
    for (const employee of this.listNhanVien) {
      if (employee.id && employee.id > maxId) {
        maxId = employee.id;
      }
    }
    return maxId;
  }

  // Định nghĩa phương thức để thêm Nhân viên vào danh sách
  addNhanVien(employee: NhanVien) {
    // Gán ID cho nhân viên mới bằng giá trị lớn nhất hiện có cộng thêm 1
    employee.id = this.getMaxId() + 1;

    // Thêm nhân viên vào danh sách
    this.listNhanVien.push(employee);
  }
  capnhatNhanVien(nv: NhanVien = <NhanVien>{}): void {
    if (nv.id == null) {
      console.error('ID của nhân viên không được null hoặc undefined.');
      return;
    }

    const index = this.listNhanVien.findIndex(p => p.id === nv.id);

    if (index === -1) {
      console.error('Không tìm thấy nhân viên với ID tương ứng.');
      return;
    }

    this.listNhanVien[index] = nv;
  }
  xoaNhanVien(id: number = 0) {
    let index = this.listNhanVien.findIndex(p => p.id === id);
    if (index !== -1) {
      this.listNhanVien.splice(index, 1); // Use splice to remove 1 element at the found index
    }
  }
}
