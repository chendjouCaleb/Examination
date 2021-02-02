import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {SchoolModule, SchoolResolver} from 'examination/app/components/school';
import {CommonModule} from '@angular/common';
import {MsfButtonModule} from 'fabric-docs';
import {SchoolListPage} from './list/school-list.page';
import {LayoutModule} from 'examination/infrastructure';
import {OrganisationLoaderModule} from 'examination/loaders';
import {SchoolHomePage} from './home/school-home.page';
import {OrganisationHttpClientModule} from 'examination/models/http';
import {ControlModule, MsfTabModule} from 'examination/controls';
import {SchoolPageLayout} from './layout/school.page-layout';
import {SchoolDepartmentPage} from './departments/school-departments.page';
import {DepartmentModule, ExaminationModule, RoomModule} from 'examination/app/components';
import {SchoolPlannersPage} from './planners/school-planners.page';
import {PlannerModule} from 'examination/app/components/member/planner';
import {SchoolRoomsPage} from 'examination/app/pages/organisation/school/rooms/school-rooms.page';
import {SchoolExaminationsPage} from 'examination/app/pages/organisation/school/examinations/school-examinations.page';
import {MsButtonModule} from '@ms-fluent/button';
import {MsGridModule} from "@ms-fluent/grid";
import {SchoolAddPage} from "examination/app/pages/organisation/school/add/school-add.page";
import {AuthorizedGuard} from "examination/app/authorization";

const routes: Routes = [
  {path: '', component: SchoolListPage},
  {path: 'add', component: SchoolAddPage, canActivate: [ AuthorizedGuard ]},
  {
    path: ':schoolId', resolve: [SchoolResolver], children: [
      {path: '', component: SchoolHomePage, data: { animation: 'HomePage'}},

      {path: 'departments', component: SchoolDepartmentPage, data: { animation: 'DepartmentPage'}},
      {path: 'examinations', component: SchoolExaminationsPage, data: { animation: 'ExaminationPage'}},
      {path: 'planners', component: SchoolPlannersPage, data: { animation: 'PlannerPage'}},
      {path: 'rooms', component: SchoolRoomsPage, data: { animation: 'RoomPage'}}
    ]
  }
];

@NgModule({
  imports: [CommonModule, MsfButtonModule, SchoolModule, DepartmentModule, OrganisationHttpClientModule,
    OrganisationLoaderModule, RoomModule, ExaminationModule, MsButtonModule, MsGridModule,
    RouterModule.forChild(routes), LayoutModule, ControlModule, PlannerModule, MsfTabModule],
  declarations: [SchoolListPage, SchoolHomePage, SchoolDepartmentPage, SchoolPageLayout, SchoolPlannersPage,
  SchoolRoomsPage, SchoolExaminationsPage, SchoolAddPage ]
})
export class SchoolPageModule {

}
