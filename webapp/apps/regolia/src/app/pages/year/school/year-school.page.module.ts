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
  ExaminationModule,
  SemesterAddModule, SemesterCourseListModule,
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
import {YearCoursesPage} from "./YearCourses.page";
import {YearExaminationsPage} from "./YearExaminationPage";

const routes: Routes = [
  {
    path: '', component: YearSchoolPageLayout, children: [
      {path: '', component: YearSchoolHomePage, data: {label: 'home'}},
      {path: 'students', component: YearSchoolStudentPage, data: {label: 'students'}},
      {path: 'students/:yearStudentId', component: YearSchoolStudentDetailsPage, data: {label: 'students'}},
      {path: 'teachers/:yearTeacherId', component: YearSchoolTeacherDetailsPage, data: {label: 'teachers'}},
      {path: 'teachers', component: YearSchoolTeacherPage, data: {label: 'teachers'}},
      {path: 'courses', component: YearCoursesPage, data: {label: 'courses'}},
      {path: 'examinations', component: YearExaminationsPage, data: {label: 'examinations'}},
      {path: 'home', redirectTo: '', pathMatch: 'full'}
    ]
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), LayoutModule, SemesterAddModule,
    SemesterListModule, YearTeacherModule,
    MsRibbonModule, BreadcrumbModule, MsButtonModule, MomentModule, MsActionMenuModule, YearStudentListModule,
    YearStudentDetailsModule, MsTableModule, ControlModule, MsPaginatorModule, YearTeacherListModule,
    YearTeacherDetailsModule, SemesterCourseListModule, ExaminationModule],
  declarations: [YearSchoolHomePage, YearSchoolStudentPage, YearSchoolStudentDetailsPage, YearSchoolTeacherPage,
    YearSchoolPageLayout, YearSchoolTeacherDetailsPage, YearCoursesPage, YearExaminationsPage ]
})
export class YearSchoolPageModule {

}
