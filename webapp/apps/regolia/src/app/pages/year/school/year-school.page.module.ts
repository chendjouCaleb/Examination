import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule, Routes} from "@angular/router";
import {YearSchoolHomePage} from "./home/YearSchoolHome.page";
import {YearSchoolPageLayout} from "./layout/YearSchoolPageLayout";
import {LayoutModule} from "../../../../infrastructure";
import {BreadcrumbModule, MsActionMenuModule, MsButtonModule, MsRibbonModule} from "@ms-fluent/components";
import {SemesterAddModule, SemesterListModule} from "@examination/components";
import {MomentModule} from "ngx-moment";

const routes: Routes = [
  {
    path: '', component: YearSchoolPageLayout, children: [
      {path: '', component: YearSchoolHomePage, data: { label: 'home'}}
    ]
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), LayoutModule, SemesterAddModule,
    SemesterListModule,
    MsRibbonModule, BreadcrumbModule, MsButtonModule, MomentModule, MsActionMenuModule],
  declarations: [ YearSchoolHomePage, YearSchoolPageLayout]
})
export class YearSchoolPageModule {

}
