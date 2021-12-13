import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule, Routes} from "@angular/router";
import {SemesterSpecialityHomePage} from "./home/SemesterSpecialityHome.page";
import {SemesterSpecialityPageLayout} from "./layout/SemesterSpecialityPageLayout";
import {LayoutModule} from "examination/infrastructure";
import {BreadcrumbModule, MsActionMenuModule, MsRibbonModule} from "@ms-fluent/components";
import {SemesterSpecialityCoursesPage} from "./SemesterSpecialityCourses.page";
import {SemesterCourseListModule} from "@examination/components";

const routes: Routes = [
  {
    path: '', component: SemesterSpecialityPageLayout, children: [
      {path: '', component: SemesterSpecialityHomePage, data: { label: 'home'}},
      {path: 'courses', component: SemesterSpecialityCoursesPage, data: { label: 'courses'}},
      {path: 'home', redirectTo: '', pathMatch: 'full'}
    ]
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), LayoutModule, MsRibbonModule, BreadcrumbModule, MsActionMenuModule, SemesterCourseListModule],
  declarations: [ SemesterSpecialityHomePage, SemesterSpecialityPageLayout, SemesterSpecialityCoursesPage]
})
export class SemesterSpecialityPageModule {

}
