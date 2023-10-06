import { Injectable } from '@angular/core';
import { Gender } from './gender';

@Injectable({
  providedIn: 'root'
})
export class GenderService {

  constructor() { }

  listGender:Gender[] =[
    { id:1, namegender:'Nam'},
    { id:2, namegender:'Nữ'},
    { id:3, namegender:'Othor'},
  ]
  getGenderById(id: number) {
    return this.listGender.find(gender => gender.id === id);
  }
}
