import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule, Routes} from "@angular/router";
import {YearSpecialityHomePage} from "./home/YearSpecialityHome.page";
import {YearSpecialityPageLayout} from "./layout/YearSpecialityPageLayout";
import {LayoutModule} from "examination/infrastructure";
import {BreadcrumbModule, MsActionMenuModule, MsButtonModule, MsRibbonModule} from "@ms-fluent/components";
import {YearSpecialityCoursesPage} from "./YearSpecialityCourses.page";
import {SemesterCourseListModule} from "../../../components/semester-course/list";
import {YearSpecialityStudentsPage} from "./YearSpecialityStudents.page";
import {YearStudentListModule} from "../../../components/year-student/List";
import {YearSpecialityCourseHoursPage} from "./YearSpecialityCourseHoursPage";
import {YearSpecialityCourseSessionsPage} from "./YearSpecialityCourseSessions.page";
import {YearLevelCourseSessionsPage} from "../level/YearLevelCourseSessions.page";
import {YearLevelCourseHoursPage} from "../level/YearLevelCourseHoursPage";
import {CourseSessionModule} from "../../../components/course-session";
import {CourseHourModule} from "../../../components/course-hour";
import {YearSpecialityExaminationPage} from "./YearSpecialityExaminationPage";
import {YearSpecialitySemesterPage} from "./YearSpecialitySemesterPage";
import {YearLevelSemesterPage} from "examination/app/pages/year/level/YearLevelSemesterPage";
import {YearLevelExaminationPage} from "examination/app/pages/year/level/YearLevelExaminationPage";
import {ExaminationSpecialityModule, SemesterSpecialityModule} from "@examination/components";

const routes: Routes = [
  {
    path: '', component: YearSpecialityPageLayout, children: [
      {path: '', component: YearSpecialityHomePage, data: {label: 'home'}},
      {path: 'courses', component: YearSpecialityCoursesPage, data: {label: 'courses'}},
      {path: 'students', component: YearSpecialityStudentsPage, data: {label: 'students'}},
      {path: 'course-sessions', component: YearSpecialityCourseSessionsPage, data: {label: 'course-sessions'}},
      {path: 'course-hours', component: YearSpecialityCourseHoursPage, data: {label: 'course-hours'}},

      {path: 'semesters', component: YearSpecialitySemesterPage, data: {label: 'semesters'}},
      {path: 'examinations', component: YearSpecialityExaminationPage, data: {label: 'examinations'}},

      {path: 'home', redirectTo: '', pathMatch: 'full'},
      {path: 'courseSessions', redirectTo: 'course-sessions', pathMatch: 'full'},
      {path: 'courseHours', redirectTo: 'course-hours', pathMatch: 'full'}
    ]
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), LayoutModule, MsRibbonModule, BreadcrumbModule,
    SemesterCourseListModule, MsActionMenuModule, MsButtonModule, YearStudentListModule, CourseSessionModule,
    CourseHourModule, ExaminationSpecialityModule, SemesterSpecialityModule],
  declarations: [YearSpecialityHomePage, YearSpecialityPageLayout, YearSpecialityStudentsPage, YearSpecialityCoursesPage,
    YearSpecialityCourseHoursPage, YearSpecialityCourseSessionsPage, YearSpecialityExaminationPage,
    YearSpecialitySemesterPage]
})
export class YearSpecialityPageModule {

}
