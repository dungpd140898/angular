import { Injectable } from '@angular/core';
import { KhuVuc } from './khu-vuc';

@Injectable({
  providedIn: 'root'
})
export class KhuVucService {
  listKhuVuc:KhuVuc[] =[
    { id:1, tenKhuVuc:'Bắc'},
    { id:2, tenKhuVuc:'Trung'},
    { id:3, tenKhuVuc:'Nam'},

  ]
  constructor() {}
  getKhuVucById(id: number) {
    return this.listKhuVuc.find(khuvuc => khuvuc.id === id);
  }
}
