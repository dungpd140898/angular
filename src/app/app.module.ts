import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { DuanListComponent } from './duan-list/duan-list.component';
import { DuanThemComponent } from './duan-them/duan-them.component';
import { DuanSuaComponent } from './duan-sua/duan-sua.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskThemComponent } from './task-them/task-them.component';
import { TaskSuaComponent } from './task-sua/task-sua.component';
import { NvListComponent } from './nv-list/nv-list.component';
import { NvThemComponent } from './nv-them/nv-them.component';
import { NvSuaComponent } from './nv-sua/nv-sua.component';
import { FormsModule } from '@angular/forms';
import { LeaderListComponent } from './leader-list/leader-list.component';
import { DuanDetailComponent } from './duan-detail/duan-detail.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { ReactiveFormsModule} from '@angular/forms';
import { DatePipe } from '@angular/common';
import { NvSuaReactiveComponent } from './nv-sua-reactive/nv-sua-reactive.component';
import { NvThemReactiveComponent } from './nv-them-reactive/nv-them-reactive.component';
import { TaskService } from './task.service';
import { TaskSuaReactiveComponent } from './task-sua-reactive/task-sua-reactive.component';
import { TaskThemReactiveComponent } from './task-them-reactive/task-them-reactive.component';
import { DuanSuaReactiveComponent } from './duan-sua-reactive/duan-sua-reactive.component';
import { DuanThemReactiveComponent } from './duan-them-reactive/duan-them-reactive.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DuanListComponent,
    DuanThemComponent,
    DuanSuaComponent,
    TaskListComponent,
    TaskThemComponent,
    TaskSuaComponent,
    NvListComponent,
    NvThemComponent,
    NvSuaComponent,
    LeaderListComponent,
    DuanDetailComponent,
    NvSuaReactiveComponent,
    NvThemReactiveComponent,
    TaskSuaReactiveComponent,
    TaskThemReactiveComponent,
    DuanSuaReactiveComponent,
    DuanThemReactiveComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgxPaginationModule,
    ReactiveFormsModule
  ],
  providers: [DatePipe, TaskService],
  bootstrap: [AppComponent]
})
export class AppModule { }
