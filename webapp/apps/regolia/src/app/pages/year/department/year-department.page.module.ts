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
  SemesterCourseListModule,
  YearTeacherDetailsModule,
  YearTeacherListModule,
  YearTeacherModule,
  YearTeacherResolver
} from "@examination/components";
import { YearDepartmentCoursesPage } from "./YearDepartmentCourses.page";
import {SemesterItemModule} from "../../../components/semester/item";

const routes: Routes = [
  {
    path: '', component: YearDepartmentPageLayout, children: [
      {path: '', component: YearDepartmentHomePage, data: {label: 'home'}},
      {path: 'courses', component: YearDepartmentCoursesPage, data: {label: 'courses'}},
      {path: 'teachers', component: YearDepartmentTeacherPage, data: {label: 'teachers'}},
      {path: 'teachers/:yearTeacherId', data: {label: 'teachers'}, resolve: [ YearTeacherResolver ],
        loadChildren: () => import('./teacher/YearTeacherPage.module').then(m => m.YearTeacherPageModule)
      },

      {path: 'home', redirectTo: '', pathMatch: 'full'}
    ]
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), LayoutModule, MsRibbonModule, YearTeacherModule,
    YearTeacherListModule, MsActionMenuModule, YearTeacherDetailsModule, BreadcrumbModule, SemesterItemModule, SemesterCourseListModule, MsButtonModule],
  declarations: [ YearDepartmentHomePage, YearDepartmentPageLayout, YearDepartmentTeacherPage, YearTeacherDetailsPage,
    YearDepartmentCoursesPage ]
})
export class YearDepartmentPageModule {

}
