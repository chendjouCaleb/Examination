import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule, Routes} from "@angular/router";
import {SemesterLevelHomePage} from "./home/SemesterLevelHome.page";
import {SemesterLevelPageLayout} from "./layout/SemesterLevelPageLayout";
import {LayoutModule} from "examination/infrastructure";
import {BreadcrumbModule, MsActionMenuModule, MsRibbonModule} from "@ms-fluent/components";
import {SemesterCourseListModule, SemesterCourseModule, SemesterCourseResolver} from "@examination/components";
import {SemesterLevelCoursesPage} from "./SemesterLevelCourses.page";

const routes: Routes = [
  {
    path: '', component: SemesterLevelPageLayout, children: [
      {path: '', component: SemesterLevelHomePage, data: {label: 'home'}},
      {path: 'courses', component: SemesterLevelCoursesPage, data: {label: 'courses'}},

      {
        path: 'courses/:semesterCourseId', data: {label: 'courses'}, resolve: [SemesterCourseResolver],
        loadChildren: () => import('./course/semester-course.page.module').then(m => m.SemesterCoursePageModule)
      },

      {path: 'home', redirectTo: '', pathMatch: 'full'}
    ]
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), LayoutModule, MsRibbonModule,
    SemesterCourseListModule, MsActionMenuModule, SemesterCourseModule, BreadcrumbModule],
  declarations: [SemesterLevelHomePage, SemesterLevelPageLayout, SemesterLevelCoursesPage]
})
export class SemesterLevelPageModule {

}
