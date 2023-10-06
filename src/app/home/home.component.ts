import { Component, OnInit } from '@angular/core';
import { DuAnService } from '../du-an.service';
import { TaskService } from '../task.service';
import { NhanVienService } from '../nhan-vien.service';
import { NhanVien } from '../nhan-vien';
import { SearchService } from '../search.service';
import { Leader } from '../leader';
import { LeaderService } from '../leader.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  numberOfProjects: number = 0;
  totalMoney: number = 0;
  totalTask: number = 0;
  totalNv: number = 0
  listNhanVien:NhanVien[]= [];
  nhanvien:NhanVien[] = [];
  listLeader:Leader[] = [];
  leader:Leader[] = [];

  constructor(
    private duanService: DuAnService,
    private taskService:TaskService,
    private nhanvienService:NhanVienService,
    private searchService: SearchService,
    private leaderService:LeaderService



    ) {} // Inject service

  ngOnInit(): void {
    // Lấy số lượng dự án và tổng tiền từ service
    this.numberOfProjects = this.duanService.getNumberOfProjects();
    this.totalMoney = this.duanService.getTotalMoney();
    this.totalTask = this.taskService.getTotalTask();
    this.totalNv = this.nhanvienService.getTotalNv();
    this.listNhanVien = this.nhanvienService.listNhanVien;
    this.listLeader = this.leaderService.listLeader;
    this.searchService.getSearchKeyword().subscribe(keyword => {
      // Tìm kiếm và cập nhật danh sách sản phẩm dựa trên từ khóa
      this.filterHeader(keyword);
    });
  }
  filterHeader(keyword: string) {
    if (!keyword) {
      this.nhanvien = this.listNhanVien; // Nếu từ khóa rỗng, hiển thị toàn bộ danh sách nhân viên
    } else {
      // Sử dụng phương thức filter để lọc danh sách nhân viên dựa trên từ khóa
      this.nhanvien = this.listNhanVien.filter(p => {
        const hoLowerCase = p.ho ? p.ho.toLowerCase() : ''; // Kiểm tra nếu trường họ rỗng
        const tenLowerCase = p.ten ? p.ten.toLowerCase() : ''; // Kiểm tra nếu trường tên rỗng

        return hoLowerCase.includes(keyword.toLowerCase()) || tenLowerCase.includes(keyword.toLowerCase());
      });
    }
  }
  p:number = 1;
  itemsPerPage:number = 3;
  totalNV:any;

}
