import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule, Routes} from "@angular/router";
import {YearLevelHomePage} from "./home/YearLevelHome.page";
import {YearLevelPageLayout} from "./layout/YearLevelPageLayout";
import {LayoutModule} from "../../../../infrastructure";
import {BreadcrumbModule, MsActionMenuModule, MsRibbonModule} from "@ms-fluent/components";
import {YearLevelCoursesPage} from "./YearLevelCourses.page";
import {SemesterCourseListModule} from "../../../components/semester-course/list";

const routes: Routes = [
  {
    path: '', component: YearLevelPageLayout, children: [
      {path: '', component: YearLevelHomePage, data: {label: 'home'}},
      {path: 'courses', component: YearLevelCoursesPage, data: {label: 'courses'}},
      {path: 'home', redirectTo: '', pathMatch: 'full'}
    ]
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), LayoutModule, MsRibbonModule, MsActionMenuModule, SemesterCourseListModule, BreadcrumbModule],
  declarations: [ YearLevelHomePage, YearLevelPageLayout, YearLevelCoursesPage]
})
export class YearLevelPageModule {

}
