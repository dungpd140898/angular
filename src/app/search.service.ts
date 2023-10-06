import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private searchKeyword = new BehaviorSubject<string>(''); // Sử dụng BehaviorSubject để theo dõi từ khóa tìm kiếm

  setSearchKeyword(keyword: string) {
    this.searchKeyword.next(keyword); // Cập nhật giá trị từ khóa
  }

  getSearchKeyword() {
    return this.searchKeyword.asObservable(); // Trả về một Observable để theo dõi thay đổi của từ khóa
  }
}
