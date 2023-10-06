import { Injectable } from '@angular/core';
import { Leader } from './leader';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor() { }
  listLeader: Leader[] = [
    {id: 1, name: 'Nguyễn Văn Long'},
    {id: 2, name: 'Phạm Đình Dũng'},
    {id: 3, name: 'Ngô Quang Huy'},
    {id: 4, name: 'Trần Nhật Sang'}

  ];
  getLeaderById(id: number) {
    return this.listLeader.find(employee => employee.id === id);
  }
}
