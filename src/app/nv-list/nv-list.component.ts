import { Gender } from './../gender';

import { Component } from '@angular/core';
import { NhanVien } from '../nhan-vien';
import { SearchService } from '../search.service';
import { NhanVienService } from '../nhan-vien.service';
import { KhuVucService } from '../khu-vuc.service';
import { KhuVuc } from '../khu-vuc';
import { GenderService } from '../gender.service';

@Component({
  selector: 'app-nv-list',
  templateUrl: './nv-list.component.html',
  styleUrls: ['./nv-list.component.css']
})
export class NvListComponent {
  constructor(
    private searchService: SearchService,
    private nhanvienService: NhanVienService,
    private khuVucService: KhuVucService,
    private genderService: GenderService
     ) {}

  nhanvien: NhanVien[] = [];
  ngOnInit(): void {
    this.searchService.getSearchKeyword().subscribe(keyword => {
      // Tìm kiếm và cập nhật danh sách sản phẩm dựa trên từ khóa
      this.filterHeader(keyword);
    });
  }
  filterHeader(keyword: string) {
    if (!keyword) {
      this.nhanvien = this.nhanvienService.listNhanVien; // Nếu từ khóa rỗng, hiển thị toàn bộ danh sách nhân viên
    } else {
      // Sử dụng phương thức filter để lọc danh sách nhân viên dựa trên từ khóa
      this.nhanvien = this.nhanvienService.listNhanVien.filter(p => {
        const hoLowerCase = p.ho ? p.ho.toLowerCase() : ''; // Kiểm tra nếu trường họ rỗng
        const tenLowerCase = p.ten ? p.ten.toLowerCase() : ''; // Kiểm tra nếu trường tên rỗng

        return hoLowerCase.includes(keyword.toLowerCase()) || tenLowerCase.includes(keyword.toLowerCase());
      });
    }
  }
  getKhuVucName(khuvucID: number): string {
    const khuvuc = this.khuVucService.getKhuVucById(khuvucID);
   if(khuvuc){
    return `${khuvuc.tenKhuVuc} `
   }else{
    return `Tên không xác định`
   }
  }
  getGenderName(genderID: number): string {
    const gender = this.genderService.getGenderById(genderID);
   if(gender){
    return `${gender.namegender} `
   }else{
    return `Tên không xác định`
   }
  }
  xoaNV(id: number = 0) {
    const confirmed = window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này?');
    if (confirmed) {
        this.nhanvienService.xoaNhanVien(id);
    }
    return false;
  }
  p:number = 1;
  itemsPerPage:number = 3;
  totalNV:any;

}
