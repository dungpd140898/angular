import { Injectable } from '@angular/core';
import { DuAn } from './du-an';
import { NhanVienService } from './nhan-vien.service';
import { NhanVien} from './nhan-vien';
import { Leader } from './leader';
import { LeaderService } from './leader.service'

@Injectable({
  providedIn: 'root'
})
export class DuAnService {
  listDuAn:DuAn[] = [
    {id:1, tenDuAn:'Quản lý trại heo', ngayStart:'2022-03-01', tien:67000000,leader:1, thanhvien:[1,3,4]},
    {id:2, tenDuAn:'Cây xanh công viên', ngayStart:'2022-04-02', tien:98500000,leader:1, thanhvien:[1,3,4]},
    {id:3, tenDuAn:'Website Văn hóa Việt', ngayStart:'2022-04-15', tien:35000000,leader:2, thanhvien:[2,4]},
    {id:4, tenDuAn:'Website Du lịch Bụi', ngayStart:'2022-04-21',tien:75500000,leader:2, thanhvien:[2,4]},
    {id:5, tenDuAn:'Quản lý nhà thuốc Vĩnh An', ngayStart:'2022-05-2',tien:97000000,leader:3, thanhvien:[3,4]},
    {id:6, tenDuAn:'Chăm sóc thú cưng', ngayStart:'2022-02-11', tien:18000000,leader:3, thanhvien:[3,4]},
  ]

  constructor(private nvService: NhanVienService,
    private leaderService: LeaderService
    ) { }

  getDuAnById(id: number) {
    return this.listDuAn.find(duAn => duAn.id === id);
  }

  getNumberOfProjects(): number {
    return this.listDuAn.length;
  }

  getTotalMoney(): number {
    return this.listDuAn.reduce((total, duAn) => total + duAn.tien, 0);
  }

  getListDuAn(): DuAn[] {
    return this.listDuAn;
  }

  getNhanVienByProjectId(projectId: number): NhanVien[] {
    const nhanViens: NhanVien[] = [];

    // Duyệt qua danh sách dự án
    for (const duAn of this.listDuAn) {
      if (duAn.id === projectId) {
        // Lấy danh sách ID nhân viên từ mảng thanhvien và thêm vào danh sách nhân viên
        for (const nhanVienId of duAn.thanhvien) {
          const nhanVien = this.nvService.getEmployeeById(nhanVienId);
          if (nhanVien) {
            nhanViens.push(nhanVien);
          }
        }
      }
    }

    return nhanViens;
  }

  getLeadersByProjectId(projectId: number): Leader[] {
    const leaders: Leader[] = [];
    // Duyệt qua danh sách dự án
    for (const duAn of this.listDuAn) {
      // Tạo một mảng tạm thời để lưu danh sách leaderId từ duAn.leader
      if (duAn.id === projectId) {
          const leader = this.leaderService.getLeaderById(duAn.leader);
          if (leader) {
            leaders.push(leader);
          }
      }


  }
  return leaders;
  }
  getMaxId(): number {
    let maxId = 0;
    for (const employee of this.listDuAn) {
      if (employee.id && employee.id > maxId) {
        maxId = employee.id;
      }
    }
    return maxId;
  }
  addProject(project: DuAn) {
    // Gán ID cho nhân viên mới bằng giá trị lớn nhất hiện có cộng thêm 1
    project.id = this.getMaxId() + 1;

    // Thêm nhân viên vào danh sách
    this.listDuAn.push(project);
  }
  updateProject(project: DuAn = <DuAn>{}): void {
    if (project.id == null) {
      console.error('ID của nhân viên không được null hoặc undefined.');
      return;
    }

    const index = this.listDuAn.findIndex(p => p.id === project.id);

    if (index === -1) {
      console.error('Không tìm thấy nhân viên với ID tương ứng.');
      return;
    }

    this.listDuAn[index] = project;
  }
  deleteProject(id: number = 0) {
    let index = this.listDuAn.findIndex(p => p.id === id);
    if (index !== -1) {
      this.listDuAn.splice(index, 1); // Use splice to remove 1 element at the found index
    }
  }
}
