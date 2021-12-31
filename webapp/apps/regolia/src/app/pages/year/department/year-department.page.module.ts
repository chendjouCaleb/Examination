import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule, Routes} from "@angular/router";
import {YearDepartmentHomePage} from "./home/YearDepartmentHome.page";
import {YearDepartmentPageLayout} from "./layout/YearDepartmentPageLayout";
import {LayoutModule} from "../../../../infrastructure";
import {BreadcrumbModule, MsActionMenuModule, MsButtonModule, MsRibbonModule} from "@ms-fluent/components";
import {YearDepartmentTeacherPage} from "./YearDepartmentTeacher.page";
import {YearTeacherDetailsPage} from "./YearTeacherDetails.page";
import {
  CourseHourModule,
  CourseSessionModule,
  SemesterCourseListModule,
  YearStudentListModule,
  YearTeacherDetailsModule,
  YearTeacherListModule,
  YearTeacherModule,
  YearTeacherResolver
} from "@examination/components";
import {YearDepartmentCoursesPage} from "./YearDepartmentCourses.page";
import {SemesterItemModule} from "../../../components/semester/item";
import {YearDepartmentStudentPage} from "./YearDepartmentStudent.page";
import {YearDepartmentCourseHoursPage} from "./YearDepartmentCourseHoursPage";
import {YearDepartmentCourseSessionsPage} from "./YearDepartmentCourseSessions.page";

const routes: Routes = [
  {
    path: '', component: YearDepartmentPageLayout, children: [
      {path: '', component: YearDepartmentHomePage, data: {label: 'home'}},
      {path: 'courses', component: YearDepartmentCoursesPage, data: {label: 'courses'}},
      {path: 'students', component: YearDepartmentStudentPage, data: {label: 'students'}},
      {path: 'teachers', component: YearDepartmentTeacherPage, data: {label: 'teachers'}},
      {path: 'course-sessions', component: YearDepartmentCourseSessionsPage, data: {label: 'course-sessions'}},
      {path: 'course-hours', component: YearDepartmentCourseHoursPage, data: {label: 'course-hours'}},
      {
        path: 'teachers/:yearTeacherId', data: {label: 'teachers'}, resolve: [YearTeacherResolver],
        loadChildren: () => import('./teacher/YearTeacherPage.module').then(m => m.YearTeacherPageModule)
      },

      {path: 'home', redirectTo: '', pathMatch: 'full'},
      {path: 'courseSessions', redirectTo: 'course-sessions', pathMatch: 'full'},
      {path: 'courseHours', redirectTo: 'course-hours', pathMatch: 'full'}
    ]
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), LayoutModule, MsRibbonModule, YearTeacherModule,
    YearTeacherListModule, MsActionMenuModule, YearTeacherDetailsModule, BreadcrumbModule, SemesterItemModule, SemesterCourseListModule, MsButtonModule, YearStudentListModule, CourseHourModule, CourseSessionModule],
  declarations: [YearDepartmentHomePage, YearDepartmentPageLayout, YearDepartmentTeacherPage, YearTeacherDetailsPage,
    YearDepartmentCoursesPage, YearDepartmentStudentPage, YearDepartmentCourseHoursPage, YearDepartmentCourseSessionsPage]
})
export class YearDepartmentPageModule {

}
