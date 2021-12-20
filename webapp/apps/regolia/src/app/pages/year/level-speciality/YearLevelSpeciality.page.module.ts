import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule, Routes} from "@angular/router";
import {YearLevelSpecialityHomePage} from "./home/YearLevelSpecialityHome.page";
import {YearLevelSpecialityPageLayout} from "./layout/YearLevelSpecialityPageLayout";
import {LayoutModule} from "../../../../infrastructure";
import {BreadcrumbModule, MsActionMenuModule, MsRibbonModule, MsTooltipModule} from "@ms-fluent/components";
import {YearLevelSpecialityStudentsPage} from "./YearLevelSpecialityStudents.page";
import {YearStudentListModule} from "../../../components/year-student/List";

const routes: Routes = [
  {
    path: '', component: YearLevelSpecialityPageLayout, children: [
      {path: '', component: YearLevelSpecialityHomePage, data: {label: 'home'}},
      {path: 'students', component: YearLevelSpecialityStudentsPage, data: {label: 'students'}},
      {path: 'home', redirectTo: '', pathMatch: 'full'}
    ],
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), LayoutModule, MsRibbonModule, MsActionMenuModule, YearStudentListModule, BreadcrumbModule, MsTooltipModule],
  declarations: [YearLevelSpecialityHomePage, YearLevelSpecialityStudentsPage, YearLevelSpecialityPageLayout]
})
export class YearLevelSpecialityPageModule {

}
