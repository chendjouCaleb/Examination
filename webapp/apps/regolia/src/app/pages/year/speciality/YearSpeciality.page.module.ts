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

const routes: Routes = [
  {
    path: '', component: YearSpecialityPageLayout, children: [
      {path: '', component: YearSpecialityHomePage, data: {label: 'home'}},
      {path: 'courses', component: YearSpecialityCoursesPage, data: {label: 'courses'}},
      {path: 'students', component: YearSpecialityStudentsPage, data: {label: 'students'}},
      {path: 'home', redirectTo: '', pathMatch: 'full'}
    ]
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), LayoutModule, MsRibbonModule, BreadcrumbModule, SemesterCourseListModule, MsActionMenuModule, MsButtonModule, YearStudentListModule],
  declarations: [ YearSpecialityHomePage, YearSpecialityPageLayout, YearSpecialityStudentsPage, YearSpecialityCoursesPage]
})
export class YearSpecialityPageModule {

}
