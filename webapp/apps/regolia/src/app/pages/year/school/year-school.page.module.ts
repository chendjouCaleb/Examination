import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule, Routes} from "@angular/router";
import {YearSchoolHomePage} from "./home/YearSchoolHome.page";
import {YearSchoolPageLayout} from "./layout/YearSchoolPageLayout";
import {LayoutModule} from "../../../../infrastructure";
import {
  BreadcrumbModule,
  MsActionMenuModule,
  MsButtonModule,
  MsPaginatorModule,
  MsRibbonModule,
  MsTableModule
} from "@ms-fluent/components";
import {
  CourseHourModule,
  CourseSessionModule,
  ExaminationModule,
  SemesterAddModule,
  SemesterCourseListModule,
  SemesterListModule, YearDepartmentModule,
  YearStudentDetailsModule,
  YearStudentListModule,
  YearTeacherDetailsModule,
  YearTeacherListModule,
  YearTeacherModule
} from "@examination/components";
import {MomentModule} from "ngx-moment";
import {YearSchoolStudentPage} from "./YearSchoolStudent.page";
import {YearSchoolStudentDetailsPage} from "./YearSchoolStudentDetails.page";
import {ControlModule} from "../../../../controls";
import {YearSchoolTeacherPage} from "./YearSchoolTeacher.page";
import {YearSchoolTeacherDetailsPage} from "./YearSchoolTeacherDetails.page";
import {YearCoursesPage} from "./YearCourses.page";
import {YearExaminationsPage} from "./YearExaminationPage";
import {ExaminationListModule} from "../../../components/examination/list";
import {YearCourseHoursPage} from "./YearCourseHoursPage";
import {YearCourseSessionsPage} from "./YearCourseSessions.page";

const routes: Routes = [
  {
    path: '', component: YearSchoolPageLayout, children: [
      {path: '', component: YearSchoolHomePage, data: {label: 'home'}},
      {path: 'students', component: YearSchoolStudentPage, data: {label: 'students'}},
      {path: 'students/:yearStudentId', component: YearSchoolStudentDetailsPage, data: {label: 'students'}},
      {path: 'teachers/:yearTeacherId', component: YearSchoolTeacherDetailsPage, data: {label: 'teachers'}},
      {path: 'teachers', component: YearSchoolTeacherPage, data: {label: 'teachers'}},
      {path: 'courses', component: YearCoursesPage, data: {label: 'courses'}},
      {path: 'course-sessions', component: YearCourseSessionsPage, data: {label: 'course-sessions'}},
      {path: 'course-hours', component: YearCourseHoursPage, data: {label: 'course-hours'}},
      {path: 'examinations', component: YearExaminationsPage, data: {label: 'examinations'}},
      {path: 'home', redirectTo: '', pathMatch: 'full'},
      {path: 'courseSessions', redirectTo: 'course-sessions', pathMatch: 'full'},
      {path: 'courseHours', redirectTo: 'course-hours', pathMatch: 'full'}
    ]
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), LayoutModule, SemesterAddModule, SemesterListModule,
    YearTeacherModule, MsRibbonModule, BreadcrumbModule, MsButtonModule, MomentModule, MsActionMenuModule,
    YearStudentListModule, YearStudentDetailsModule, MsTableModule, ControlModule, MsPaginatorModule,
    YearTeacherListModule, YearTeacherDetailsModule, SemesterCourseListModule, ExaminationModule, ExaminationListModule,
    CourseSessionModule, CourseHourModule, YearDepartmentModule ],
  declarations: [YearSchoolHomePage, YearSchoolStudentPage, YearSchoolStudentDetailsPage, YearSchoolTeacherPage,
    YearSchoolPageLayout, YearSchoolTeacherDetailsPage, YearCoursesPage, YearExaminationsPage, YearCourseHoursPage,
    YearCourseSessionsPage]
})
export class YearSchoolPageModule {

}
