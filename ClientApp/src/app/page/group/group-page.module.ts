import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GroupListPage} from './list/group-list.page';
import {RouterModule, Routes} from '@angular/router';
import {MsfButtonModule, MsfIconModule, MsfMenuModule, MsfModalModule, MsfPersonaModule, MsfTableModule} from 'fabric-docs';
import {GroupHomePage} from './home/group-home.page';
import {MomentModule} from 'ngx-moment';
import {GroupModule, GroupResolver} from 'src/app/group';
import {ControlModule} from 'examination/controls';
import {ExaminationModule} from 'examination/app/examination';
import {MatRippleModule} from '@angular/material/core';
import { GroupStudentsPage } from './students/group-students.page';
import { StudentModule } from 'examination/app/student';

const routes: Routes = [
  {path: '', component: GroupListPage},
  {path: ':groupId/home', component: GroupHomePage, resolve: [GroupResolver]},
  {path: ':groupId/students', component: GroupStudentsPage, resolve: [GroupResolver]}
];

@NgModule({
  imports: [CommonModule, ControlModule, GroupModule, ExaminationModule, StudentModule,
     MsfPersonaModule,
    MsfButtonModule, MomentModule, MatRippleModule, MsfTableModule,
    MsfIconModule, MsfMenuModule, MsfModalModule,
    RouterModule.forChild(routes)],
  declarations: [GroupListPage, GroupHomePage, GroupStudentsPage],
  providers: [GroupResolver]
})
export class GroupPageModule {

}
