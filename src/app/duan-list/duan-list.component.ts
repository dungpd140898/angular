import { Component } from '@angular/core';
import { DuAn } from '../du-an';
import { SearchService } from '../search.service';
import { DuAnService } from '../du-an.service';
import { LeaderService } from '../leader.service';

@Component({
  selector: 'app-duan-list',
  templateUrl: './duan-list.component.html',
  styleUrls: ['./duan-list.component.css']
})
export class DuanListComponent {
  listDuAn:DuAn[] = []
  constructor(
    private searchService: SearchService,
    private duanService: DuAnService,
    private leaderService: LeaderService
    ) {}
  // filteredProducts: SanPham[] = this.products; // Danh sách sản phẩm sau khi lọc
  tukhoa: string = '';
  duan: DuAn[] = [];
  ngOnInit(): void {
    this.searchService.getSearchKeyword().subscribe(keyword => {
      // Tìm kiếm và cập nhật danh sách sản phẩm dựa trên từ khóa
      this.filterHeader(keyword);
    });
  }
  filterHeader(keyword: string) {
    if (!keyword) {
      this.duan = this.duanService.listDuAn; // Nếu từ khóa rỗng, hiển thị toàn bộ danh sách sản phẩm
    } else {
      // Sử dụng phương thức filter để lọc danh sách sản phẩm dựa trên từ khóa
      this.duan = this.duanService.listDuAn.filter(p =>
        p.tenDuAn.toLowerCase().includes(keyword.toLowerCase())
      );
    }
  }
  getLeaderName(leaderID: number): string {
    const leader = this.leaderService.getLeaderById(leaderID);
   if(leader){
    return `${leader.name}`
   }else{
    return `Tên không xác định`
   }
  }
  deleteProject(id: number = 0) {
    const confirmed = window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này?');
    if (confirmed) {
        this.duanService.deleteProject(id);
    }
    return false;
  }
  p:number = 1;
  itemsPerPage:number = 3;
  totalNV:any;


}
