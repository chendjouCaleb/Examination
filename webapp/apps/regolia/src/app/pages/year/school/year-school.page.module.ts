import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule, Routes} from "@angular/router";
import {YearSchoolHomePage} from "./home/YearSchoolHome.page";
import {YearSchoolPageLayout} from "./layout/YearSchoolPageLayout";
import {LayoutModule} from "../../../../infrastructure";
import {BreadcrumbModule, MsActionMenuModule, MsButtonModule, MsRibbonModule} from "@ms-fluent/components";
import {
  SemesterAddModule,
  SemesterListModule,
  YearStudentDetailsModule,
  YearStudentListModule
} from "@examination/components";
import {MomentModule} from "ngx-moment";
import {YearSchoolStudentPage} from "./YearSchoolStudent.page";
import {YearSchoolStudentDetailsPage} from "./YearSchoolStudentDetails.page";

const routes: Routes = [
  {
    path: '', component: YearSchoolPageLayout, children: [
      {path: '', component: YearSchoolHomePage, data: { label: 'home'}},
      {path: 'students', component: YearSchoolStudentPage, data: { label: 'students'}},
      {path: 'students/:yearStudentId', component: YearSchoolStudentDetailsPage, data: { label: 'students'}}
    ]
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), LayoutModule, SemesterAddModule,
    SemesterListModule,
    MsRibbonModule, BreadcrumbModule, MsButtonModule, MomentModule, MsActionMenuModule, YearStudentListModule, YearStudentDetailsModule],
  declarations: [ YearSchoolHomePage, YearSchoolStudentPage, YearSchoolStudentDetailsPage, YearSchoolPageLayout]
})
export class YearSchoolPageModule {

}
