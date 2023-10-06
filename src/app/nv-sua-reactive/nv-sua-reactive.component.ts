import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { NhanVien } from '../nhan-vien';
import { NhanVienService } from '../nhan-vien.service';
import { KhuVuc } from '../khu-vuc';
import { Gender } from '../gender';
import { KhuVucService } from '../khu-vuc.service';
import { GenderService } from '../gender.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-nv-sua-reactive',
  templateUrl: './nv-sua-reactive.component.html',
  styleUrls: ['./nv-sua-reactive.component.css']
})
export class NvSuaReactiveComponent implements OnInit {
  form: FormGroup;
  employees: KhuVuc[];
  selectedEmployeeId: number | undefined;
  genders: Gender[];
  selectedGenderId: number | undefined;
  idNV: number = Number(this.activeRoute.snapshot.params['id']);
  nv: NhanVien = {
    id: 0,
    ho: '',
    ten: '',
    ngaysinh: '',
    phai: 0,
    khuvuc: 0,
  };



  constructor(
    private fb: FormBuilder,
    private nvService: NhanVienService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private khuVucService: KhuVucService,
    private genderService: GenderService,
    private datePipe: DatePipe
  ) {
    this.employees = khuVucService.listKhuVuc;
    this.genders = genderService.listGender;
    const ngaySinh = this.nv.ngaysinh; // Đã có giá trị "2001-1-3"
    const formattedNgaySinh = this.datePipe.transform(ngaySinh, 'dd/MM/yyyy');
    this.form = this.fb.group({
      ho: ['', Validators.required],
      ten: ['', Validators.required],
      ngaysinh: formattedNgaySinh,
      phai: [0],
      khuvuc: [0]
    });
  }

  ngOnInit(): void {
    let kq = this.nvService.getMotNhanVien(this.idNV);
    this.nv = kq as NhanVien;
    this.form.patchValue(this.nv);
  }

  capnhatNV() {
    const ho = this.form.get('ho')?.value;
    const ten = this.form.get('ten')?.value;
    const ngaysinh = this.form.get('ngaysinh')?.value;
    const phai = Number(this.form.get('phai')?.value);
    const khuvuc = Number(this.form.get('khuvuc')?.value);


    const ngaySinhFormatted = this.datePipe.transform(ngaysinh, 'dd/MM/yyyy');

    const updatedNv: NhanVien = {
      id: this.nv.id,
      ho: ho,
      ten: ten,
      ngaysinh: ngaySinhFormatted,
      phai: phai,
      khuvuc: khuvuc
    };

    this.nvService.capnhatNhanVien(updatedNv);
    this.router.navigate(['/nhanvien']);
  }
}
