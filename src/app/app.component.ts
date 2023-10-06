import { Component } from '@angular/core';
import { SearchService} from './search.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Assignment';
  searchKeyword: string = '';
  constructor(private searchService: SearchService) {}

  onSearch() {
    this.searchService.setSearchKeyword(this.searchKeyword);
    console.log(this.searchKeyword);
    // Cập nhật từ khóa tìm kiếm sử dụng dịch vụ
  }
}
