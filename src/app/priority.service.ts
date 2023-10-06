import { Injectable } from '@angular/core';
import { Priority } from './priority';

@Injectable({
  providedIn: 'root'
})
export class PriorityService {
  listPriority:Priority[] =[
    { id:1, namePriority:'Thấp'},
    { id:2, namePriority:'Trung Bình'},
    { id:3, namePriority:'Cao'},

  ]
  constructor() {}
}
