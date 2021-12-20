import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule, Routes} from "@angular/router";
import {SemesterDepartmentHomePage} from "./home/SemesterDepartmentHome.page";
import {SemesterDepartmentPageLayout} from "./layout/SemesterDepartmentPageLayout";
import {LayoutModule} from "@examination/infrastructure";
import {BreadcrumbModule, MsActionMenuModule, MsRibbonModule} from "@ms-fluent/components";
import {SemesterDepartmentTeacherPage} from "./SemesterDepartmentTeacher.page";
import {SemesterDepartmentCoursePage} from "./SemesterDepartmentCourse.page";
import {
  SemesterCourseListModule, SemesterStudentListModule,
  SemesterTeacherListModule,
  SemesterTeacherModule,
  SemesterTeacherResolver
} from "@examination/components";
import {SemesterDepartmentStudentsPage} from "./SemesterDepartmentStudents.page";

const routes: Routes = [
  {
    path: '', component: SemesterDepartmentPageLayout, children: [
      {path: '', component: SemesterDepartmentHomePage, data: {label: 'home'}},
      {path: 'courses', component: SemesterDepartmentCoursePage, data: {label: 'courses'}},
      {path: 'teachers', component: SemesterDepartmentTeacherPage, data: {label: 'teachers'}},
      {path: 'students', component: SemesterDepartmentStudentsPage, data: {label: 'students'}},
      {
        path: 'teachers/:semesterTeacherId', data: {label: 'teachers'}, resolve: [SemesterTeacherResolver],
        loadChildren: () => import('./teacher/SemesterTeacherPage.module').then(m => m.SemesterTeacherPageModule)
      },
      { path: 'home', redirectTo: '', pathMatch: 'full'}
    ]
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), LayoutModule, MsRibbonModule, SemesterTeacherModule,
    BreadcrumbModule, MsActionMenuModule, SemesterTeacherListModule, SemesterCourseListModule, SemesterStudentListModule],
  declarations: [SemesterDepartmentHomePage, SemesterDepartmentPageLayout, SemesterDepartmentTeacherPage,
    SemesterDepartmentCoursePage, SemesterDepartmentStudentsPage]
})
export class SemesterDepartmentPageModule {

}
