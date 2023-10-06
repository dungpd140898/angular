import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DuAnService } from '../du-an.service';
import { DuAn } from '../du-an';
import { NhanVien } from '../nhan-vien';
import { Leader } from '../leader';
import { TaskService } from '../task.service';


@Component({
  selector: 'app-duan-detail',
  templateUrl: './duan-detail.component.html',
  styleUrls: ['./duan-detail.component.css']
})
export class DuanDetailComponent {
  constructor(
    private route: ActivatedRoute,
    private daService: DuAnService,
    private taskService: TaskService

  ) { }

  idDA: number = Number(this.route.snapshot.params['id']);
  sp = <DuAn>{};
  nhanViens: NhanVien[] = [];
  leaders: Leader[]= [];
  toTalTasK: number = 0;
  ngOnInit(): void {
    if (this.idDA < 0) return;
    let kq = this.daService.getDuAnById(this.idDA);
    if (kq == null) {
      this.sp = {} as DuAn;
    } else {
      this.sp = kq as DuAn;
      this.nhanViens = this.daService.getNhanVienByProjectId(this.idDA);
      this.leaders = this.daService.getLeadersByProjectId(this.idDA);
      this.toTalTasK = this.taskService.getTotalTaskByProjectId(this.idDA);

    }
  }
}
