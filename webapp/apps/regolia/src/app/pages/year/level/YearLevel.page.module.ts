import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule, Routes} from "@angular/router";
import {YearLevelHomePage} from "./home/YearLevelHome.page";
import {YearLevelPageLayout} from "./layout/YearLevelPageLayout";
import {LayoutModule} from "../../../../infrastructure";
import {BreadcrumbModule, MsActionMenuModule, MsRibbonModule} from "@ms-fluent/components";
import {YearLevelCoursesPage} from "./YearLevelCourses.page";
import {SemesterCourseListModule} from "../../../components/semester-course/list";
import {YearLevelStudentsPage} from "./YearLevelStudents.page";
import {YearStudentListModule} from "../../../components/year-student/List";
import {YearDepartmentCourseSessionsPage} from "../department/YearDepartmentCourseSessions.page";
import {YearDepartmentCourseHoursPage} from "../department/YearDepartmentCourseHoursPage";
import {YearLevelCourseSessionsPage} from "./YearLevelCourseSessions.page";
import {YearLevelCourseHoursPage} from "./YearLevelCourseHoursPage";
import {CourseHourModule} from "../../../components/course-hour";
import {CourseSessionModule} from "../../../components/course-session";

const routes: Routes = [
  {
    path: '', component: YearLevelPageLayout, children: [
      {path: '', component: YearLevelHomePage, data: {label: 'home'}},
      {path: 'courses', component: YearLevelCoursesPage, data: {label: 'courses'}},
      {path: 'students', component: YearLevelStudentsPage, data: {label: 'students'}},
      {
        path: 'students/:yearStudentId', data: {label: 'students'},
        loadChildren: () => import('./student/YearStudentPage.module').then(m => m.YearStudentPageModule)
      },
      {path: 'course-sessions', component: YearLevelCourseSessionsPage, data: {label: 'course-sessions'}},
      {path: 'course-hours', component: YearLevelCourseHoursPage, data: {label: 'course-hours'}},
      {path: 'home', redirectTo: '', pathMatch: 'full'},
      {path: 'courseSessions', redirectTo: 'course-sessions', pathMatch: 'full'},
      {path: 'courseHours', redirectTo: 'course-hours', pathMatch: 'full'}
    ]
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), LayoutModule, MsRibbonModule, MsActionMenuModule, SemesterCourseListModule, BreadcrumbModule, YearStudentListModule, CourseHourModule, CourseSessionModule],
  declarations: [YearLevelHomePage, YearLevelPageLayout, YearLevelCoursesPage, YearLevelStudentsPage,
    YearLevelCourseSessionsPage, YearLevelCourseHoursPage
  ]
})
export class YearLevelPageModule {

}
