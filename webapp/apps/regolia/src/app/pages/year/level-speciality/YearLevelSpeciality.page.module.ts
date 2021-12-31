import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule, Routes} from "@angular/router";
import {YearLevelSpecialityHomePage} from "./home/YearLevelSpecialityHome.page";
import {YearLevelSpecialityPageLayout} from "./layout/YearLevelSpecialityPageLayout";
import {LayoutModule} from "../../../../infrastructure";
import {BreadcrumbModule, MsActionMenuModule, MsRibbonModule, MsTooltipModule} from "@ms-fluent/components";
import {YearLevelSpecialityStudentsPage} from "./YearLevelSpecialityStudents.page";
import {YearStudentListModule} from "../../../components/year-student/List";
import {YearLevelSpecialityCourseSessionsPage} from "./YearLevelSpecialityCourseSessions.page";
import {YearLevelSpecialityCourseHoursPage} from "./YearLevelSpecialityCourseHoursPage";
import {CourseHourModule} from "../../../components/course-hour";
import {CourseSessionModule} from "../../../components/course-session";

const routes: Routes = [
  {
    path: '', component: YearLevelSpecialityPageLayout, children: [
      {path: '', component: YearLevelSpecialityHomePage, data: {label: 'home'}},
      {path: 'students', component: YearLevelSpecialityStudentsPage, data: {label: 'students'}},

      {path: 'course-sessions', component: YearLevelSpecialityCourseSessionsPage, data: {label: 'course-sessions'}},
      {path: 'course-hours', component: YearLevelSpecialityCourseHoursPage, data: {label: 'course-hours'}},

      {path: 'home', redirectTo: '', pathMatch: 'full'},
      {path: 'courseSessions', redirectTo: 'course-sessions', pathMatch: 'full'},
      {path: 'courseHours', redirectTo: 'course-hours', pathMatch: 'full'}
    ],
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), LayoutModule, MsRibbonModule, MsActionMenuModule, YearStudentListModule, BreadcrumbModule, MsTooltipModule, CourseHourModule, CourseSessionModule],
  declarations: [YearLevelSpecialityHomePage, YearLevelSpecialityStudentsPage, YearLevelSpecialityPageLayout,
    YearLevelSpecialityCourseHoursPage, YearLevelSpecialityCourseSessionsPage]
})
export class YearLevelSpecialityPageModule {

}
