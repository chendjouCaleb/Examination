import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule, Routes} from "@angular/router";
import {SemesterSpecialityHomePage} from "./home/SemesterSpecialityHome.page";
import {SemesterSpecialityPageLayout} from "./layout/SemesterSpecialityPageLayout";
import {LayoutModule} from "examination/infrastructure";
import {BreadcrumbModule, MsActionMenuModule, MsRibbonModule} from "@ms-fluent/components";
import {SemesterSpecialityCoursesPage} from "./SemesterSpecialityCourses.page";
import {
  CourseHourModule,
  CourseSessionModule, ExaminationSpecialityModule,
  SemesterCourseListModule,
  SemesterStudentListModule
} from "@examination/components";
import {SemesterSpecialityStudentsPage} from "./SemesterSpecialityStudents.page";
import {SemesterSpecialityCourseHoursPage} from "./SemesterSpecialityCourseHoursPage";
import {SemesterSpecialityCourseSessionsPage} from "./SemesterSpecialityCourseSessions.page";
import {SemesterSpecialityExaminationPage} from "./SemesterSpecialityExaminationPage";

const routes: Routes = [
  {
    path: '', component: SemesterSpecialityPageLayout, children: [
      {path: '', component: SemesterSpecialityHomePage, data: { label: 'home'}},
      {path: 'courses', component: SemesterSpecialityCoursesPage, data: { label: 'courses'}},
      {path: 'students', component: SemesterSpecialityStudentsPage, data: { label: 'students'}},
      {path: 'course-sessions', component: SemesterSpecialityCourseSessionsPage, data: { label: 'course-sessions'}},
      {path: 'course-hours', component: SemesterSpecialityCourseHoursPage, data: { label: 'course-hours'}},

      {path: 'examinations', component: SemesterSpecialityExaminationPage, data: { label: 'examinations'}},

      {path: 'home', redirectTo: '', pathMatch: 'full'},
      {path: 'courseSessions', redirectTo: 'course-sessions', pathMatch: 'full'},
      {path: 'courseHours', redirectTo: 'course-hours', pathMatch: 'full'}
    ]
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), LayoutModule, MsRibbonModule, BreadcrumbModule, MsActionMenuModule, SemesterCourseListModule, SemesterStudentListModule, CourseSessionModule, CourseHourModule, ExaminationSpecialityModule],
  declarations: [ SemesterSpecialityHomePage, SemesterSpecialityPageLayout, SemesterSpecialityCoursesPage,
    SemesterSpecialityStudentsPage, SemesterSpecialityCourseHoursPage, SemesterSpecialityCourseSessionsPage,
    SemesterSpecialityExaminationPage]
})
export class SemesterSpecialityPageModule {

}
