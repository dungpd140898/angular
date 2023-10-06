import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DuanListComponent } from './duan-list/duan-list.component';
import { DuanThemComponent } from './duan-them/duan-them.component';
import { DuanSuaComponent } from './duan-sua/duan-sua.component';
import { DuanDetailComponent } from './duan-detail/duan-detail.component';
import { NvListComponent } from './nv-list/nv-list.component';
import { NvThemComponent } from './nv-them/nv-them.component';
import { NvSuaComponent } from './nv-sua/nv-sua.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskThemComponent } from './task-them/task-them.component';
import { TaskSuaComponent } from './task-sua/task-sua.component';
import { NvSuaReactiveComponent } from './nv-sua-reactive/nv-sua-reactive.component';
import { NvThemReactiveComponent } from './nv-them-reactive/nv-them-reactive.component';
import { TaskSuaReactiveComponent } from './task-sua-reactive/task-sua-reactive.component';
import { TaskThemReactiveComponent } from './task-them-reactive/task-them-reactive.component';
import { DuanSuaReactiveComponent } from './duan-sua-reactive/duan-sua-reactive.component';
import { DuanThemReactiveComponent } from './duan-them-reactive/duan-them-reactive.component';


const routes: Routes = [
  {path: '' , component: HomeComponent} ,
  {path: 'duan' , component: DuanListComponent} ,
  {path: 'duan/:id', component:DuanDetailComponent},
  {path: 'admin/them' , component: DuanThemComponent} ,
  {path: 'admin/themReactive' , component: DuanThemReactiveComponent} ,
  {path: 'duan/sua/:id' , component: DuanSuaComponent},
  {path: 'admin/suaReactive/:id', component: DuanSuaReactiveComponent},
  {path: 'nhanvien' , component: NvListComponent} ,
  {path: 'nhanvien/them' , component: NvThemComponent} ,
  {path: 'admin/updatenv/:id' , component:NvSuaComponent} ,
  {path: 'task' , component: TaskListComponent} ,
  {path: 'task/them' , component: TaskThemComponent} ,
  {path: 'task/sua/:id' , component: TaskSuaComponent},
  {path: 'admin/updatenvReactive/:id', component: NvSuaReactiveComponent},
  {path: 'nhanvien/themReactive', component: NvThemReactiveComponent},
  {path: 'task/suareactive/:id', component: TaskSuaReactiveComponent},
  {path: 'task/themReactive', component: TaskThemReactiveComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
