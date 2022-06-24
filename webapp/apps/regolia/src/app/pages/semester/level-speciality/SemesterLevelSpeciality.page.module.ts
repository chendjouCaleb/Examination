import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule, Routes} from "@angular/router";
import {SemesterLevelSpecialityHomePage} from "./home/SemesterLevelSpecialityHome.page";
import {SemesterLevelSpecialityPageLayout} from "./layout/SemesterLevelSpecialityPageLayout";
import {LayoutModule} from "../../../../infrastructure";
import {MsActionMenuModule, MsRibbonModule} from "@ms-fluent/components";
import {SemesterLevelSpecialityStudentsPage} from "./SemesterLevelSpecialityStudents.page";
import {SemesterStudentListModule} from "../../../components/semester-student/List";
import {SemesterLevelSpecialityCourseHoursPage} from "./SemesterLevelSpecialityCourseHoursPage";
import {SemesterLevelSpecialityCourseSessionsPage} from "./SemesterLevelSpecialityCourseSessions.page";
import {SemesterLevelCourseSessionsPage} from "../level/SemesterLevelCourseSessions.page";
import {SemesterLevelCourseHoursPage} from "../level/SemesterLevelCourseHoursPage";
import {CourseHourModule} from "../../../components/course-hour";
import {CourseSessionModule} from "../../../components/course-session";
import {SemesterLevelSpecialityExaminationPage} from "./SemesterLevelSpecialityExaminationPage";
import {ExaminationLevelSpecialityModule} from "@examination/components";

const routes: Routes = [
  {
    path: '', component: SemesterLevelSpecialityPageLayout, children: [
      {path: '', component: SemesterLevelSpecialityHomePage, data: {label: 'home'}},
      {path: 'students', component: SemesterLevelSpecialityStudentsPage, data: {label: 'students'}},
      {path: 'examinations', component: SemesterLevelSpecialityExaminationPage, data: {label: 'examinations'}},
      {path: 'course-sessions', component: SemesterLevelCourseSessionsPage, data: {label: 'course-sessions'}},
      {path: 'course-hours', component: SemesterLevelCourseHoursPage, data: {label: 'course-hours'}},
      {path: 'home', redirectTo: '', pathMatch: 'full'},
      {path: 'courseSessions', redirectTo: 'course-sessions', pathMatch: 'full'},
      {path: 'courseHours', redirectTo: 'course-hours', pathMatch: 'full'}
    ]
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), LayoutModule, MsRibbonModule, SemesterStudentListModule,
    MsActionMenuModule, CourseHourModule, CourseSessionModule, ExaminationLevelSpecialityModule],
  declarations: [SemesterLevelSpecialityHomePage, SemesterLevelSpecialityStudentsPage, SemesterLevelSpecialityPageLayout,
    SemesterLevelSpecialityCourseHoursPage, SemesterLevelSpecialityCourseSessionsPage,
    SemesterLevelSpecialityExaminationPage]
})
export class SemesterLevelSpecialityPageModule {

}
