import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule, Routes} from "@angular/router";
import {YearSchoolHomePage} from "./home/YearSchoolHome.page";
import {YearSchoolPageLayout} from "./layout/YearSchoolPageLayout";
import {LayoutModule} from "../../../../infrastructure";
import {
  BreadcrumbModule,
  MsActionMenuModule,
  MsButtonModule, MsPaginatorModule,
  MsRibbonModule,
  MsTableModule
} from "@ms-fluent/components";
import {
  SemesterAddModule,
  SemesterListModule,
  YearStudentDetailsModule,
  YearStudentListModule, YearTeacherDetailsModule, YearTeacherList, YearTeacherListModule, YearTeacherModule
} from "@examination/components";
import {MomentModule} from "ngx-moment";
import {YearSchoolStudentPage} from "./YearSchoolStudent.page";
import {YearSchoolStudentDetailsPage} from "./YearSchoolStudentDetails.page";
import {ControlModule} from "../../../../controls";
import {YearSchoolTeacherPage} from "./YearSchoolTeacher.page";
import {YearSchoolTeacherDetailsPage} from "./YearSchoolTeacherDetails.page";

const routes: Routes = [
  {
    path: '', component: YearSchoolPageLayout, children: [
      {path: '', component: YearSchoolHomePage, data: {label: 'home'}},
      {path: 'students', component: YearSchoolStudentPage, data: {label: 'students'}},
      {path: 'students/:yearStudentId', component: YearSchoolStudentDetailsPage, data: {label: 'students'}},
      {path: 'teachers/:yearTeacherId', component: YearSchoolTeacherDetailsPage, data: {label: 'teachers'}},
      {path: 'teachers', component: YearSchoolTeacherPage, data: {label: 'teachers'}},
      {path: 'home', redirectTo: '', pathMatch: 'full'}
    ]
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), LayoutModule, SemesterAddModule,
    SemesterListModule, YearTeacherModule,
    MsRibbonModule, BreadcrumbModule, MsButtonModule, MomentModule, MsActionMenuModule, YearStudentListModule, YearStudentDetailsModule, MsTableModule, ControlModule, MsPaginatorModule, YearTeacherListModule, YearTeacherDetailsModule],
  declarations: [YearSchoolHomePage, YearSchoolStudentPage, YearSchoolStudentDetailsPage, YearSchoolTeacherPage,
    YearSchoolPageLayout, YearSchoolTeacherDetailsPage]
})
export class YearSchoolPageModule {

}
