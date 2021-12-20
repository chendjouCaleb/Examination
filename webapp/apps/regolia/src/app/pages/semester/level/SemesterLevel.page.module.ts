import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule, Routes} from "@angular/router";
import {SemesterLevelHomePage} from "./home/SemesterLevelHome.page";
import {SemesterLevelPageLayout} from "./layout/SemesterLevelPageLayout";
import {LayoutModule} from "examination/infrastructure";
import {BreadcrumbModule, MsActionMenuModule, MsRibbonModule} from "@ms-fluent/components";
import {
  SemesterCourseListModule,
  SemesterCourseModule,
  SemesterCourseResolver,
  SemesterStudentListModule, SemesterStudentResolver
} from "@examination/components";
import {SemesterLevelCoursesPage} from "./SemesterLevelCourses.page";
import {SemesterLevelStudentsPage} from "./SemesterLevelStudents.page";

const routes: Routes = [
  {
    path: '', component: SemesterLevelPageLayout, children: [
      {path: '', component: SemesterLevelHomePage, data: {label: 'home'}},
      {path: 'courses', component: SemesterLevelCoursesPage, data: {label: 'courses'}},
      {path: 'students', component: SemesterLevelStudentsPage, data: {label: 'students'}},
      {
        path: 'courses/:semesterCourseId', data: {label: 'courses'}, resolve: [SemesterCourseResolver],
        loadChildren: () => import('./course/semester-course.page.module').then(m => m.SemesterCoursePageModule)
      },
      {
        path: 'students/:semesterStudentId', data: {label: 'students'}, resolve: [SemesterStudentResolver],
        loadChildren: () => import('./student/SemesterStudentPage.module').then(m => m.SemesterStudentPageModule)
      },

      {path: 'home', redirectTo: '', pathMatch: 'full'}
    ]
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), LayoutModule, MsRibbonModule,
    SemesterCourseListModule, MsActionMenuModule, SemesterCourseModule, BreadcrumbModule, SemesterStudentListModule],
  declarations: [SemesterLevelHomePage, SemesterLevelPageLayout, SemesterLevelCoursesPage, SemesterLevelStudentsPage]
})
export class SemesterLevelPageModule {

}
