import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SpecialityListPage} from './list/speciality-list.page';
import {RouterModule, Routes} from '@angular/router';
import {MsfButtonModule, MsfIconModule, MsfMenuModule, MsfModalModule, MsfPersonaModule, MsfTableModule} from 'fabric-docs';
import {SpecialityHomePage} from './home/speciality-home.page';
import {MomentModule} from 'ngx-moment';
import {SpecialityModule, SpecialityResolver} from 'src/app/speciality';
import {ControlModule} from 'examination/controls';
import {ExaminationModule} from 'examination/app/examination';
import {MatRippleModule} from '@angular/material/core';
import {SpecialityGroupListPage} from "examination/app/page/speciality/groups/speciality-group-list.page";
import {GroupModule} from "examination/app/group";
import {SpecialityStudentsPage} from "examination/app/page/speciality/students/speciality-students.page";
import {StudentModule} from "examination/app/student";

const routes: Routes = [
  {path: '', component: SpecialityListPage},
  {path: ':specialityId/groups', component: SpecialityGroupListPage, resolve: [SpecialityResolver]},
  {path: ':specialityId/students', component: SpecialityStudentsPage, resolve: [SpecialityResolver]},
  {path: ':specialityId/home', component: SpecialityHomePage, resolve: [SpecialityResolver]}
];

@NgModule({
  imports: [CommonModule, ControlModule, SpecialityModule, ExaminationModule, MsfPersonaModule,
    MsfButtonModule, MomentModule, MatRippleModule, MsfTableModule, StudentModule,
    MsfIconModule, MsfMenuModule, MsfModalModule, GroupModule,
    RouterModule.forChild(routes)],
  declarations: [SpecialityListPage, SpecialityHomePage, SpecialityGroupListPage, SpecialityStudentsPage],
  providers: [SpecialityResolver]
})
export class SpecialityPageModule {

}
